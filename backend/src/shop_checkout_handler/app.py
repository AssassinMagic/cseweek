import json
import os
import stripe
import boto3

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
FRONTEND_URL = os.environ.get('FRONTEND_URL')
shop_items_table = boto3.resource('dynamodb').Table(os.environ.get('SHOP_ITEM_TABLE_NAME'))

def lambda_handler(event, context):
    print(f"## Received event: {event}")
    body = json.loads(event.get('body', '{}'))

    try:
        email = body.get('email')
        cart = body.get('cart') # Expects: [{'item_id': 'abc', 'quantity': 1}, ...]

        if not email or not cart:
            return {'statusCode': 400, 'body': json.dumps({'error': 'Missing email or cart'})}

        line_items = []
        for item in cart:
            # --- CRITICAL: Get price from our DB, not the client ---
            db_item = shop_items_table.get_item(Key={'item_id': item.get('item_id')})
            if 'Item' not in db_item:
                return {'statusCode': 404, 'body': json.dumps({'error': f"Item {item.get('item_id')} not found"})}
            
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {'name': db_item['Item'].get('name')},
                    'unit_amount': int(db_item['Item'].get('price_cents')),
                },
                'quantity': int(item.get('quantity')),
            })

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=f"{FRONTEND_URL}/shop/success",
            cancel_url=f"{FRONTEND_URL}/shop",
            customer_email=email,
            metadata={
                'email': email,
                'cart': json.dumps(cart), # Pass cart for our records
                'source': 'shop-checkout'
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'id': session.id})
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': str(e)})}