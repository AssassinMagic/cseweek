import json
import boto3
import os
import stripe
import time
import uuid

donations_table = boto3.resource('dynamodb').Table(os.environ.get('DONATIONS_TABLE_NAME'))
shop_orders_table = boto3.resource('dynamodb').Table(os.environ.get('SHOP_ORDERS_TABLE_NAME'))
webhook_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

def lambda_handler(event, context):
    print("## Received Stripe webhook")
    payload = event.get('body')
    sig_header = event.get('headers', {}).get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
    except (ValueError, stripe.error.SignatureVerificationError) as e:
        print(f"## Error verifying Stripe signature: {e}")
        return {'statusCode': 400, 'body': json.dumps({'error': 'Invalid signature'})}

    # Handle the 'checkout.session.completed' event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        metadata = session.get('metadata', {})
        source = metadata.get('source', 'unknown')
        
        print(f"## Processing checkout for source: {source}")
        
        try:
            if source == 'donate-page' or source == 'rsvp-family':
                save_donation(session, metadata)
            elif source == 'shop-checkout':
                save_shop_order(session, metadata)
            else:
                print(f"## Unknown payment source: {source}")

        except Exception as e:
            print(f"## Error processing webhook: {e}")
            return {'statusCode': 500, 'body': json.dumps({'error': 'Webhook processing error'})}

    return {'statusCode': 200, 'body': json.dumps({'message': 'Received'})}

def save_donation(session, metadata):
    """Saves a record to the DonationsTable."""
    name = metadata.get('name', 'Anonymous')
    email = metadata.get('email')
    is_anonymous = metadata.get('is_anonymous', 'false').lower() == 'true'
    
    item_to_save = {
        'donation_id': str(uuid.uuid4()),
        'stripe_session_id': session.get('id'),
        'name': name,
        'email': email,
        'amount_cents': session.get('amount_total', 0),
        'is_anonymous': is_anonymous,
        'source': metadata.get('source'),
        'donated_at': int(time.time())
    }

    if not is_anonymous:
        item_to_save['is_public'] = "TRUE"
        print(f"## Saving public donation for {name}")
    else:
        print(f"## Saving anonymous donation")

    donations_table.put_item(Item=item_to_save)

def save_shop_order(session, metadata):
    """Saves a record to the ShopOrdersTable."""
    item_to_save = {
        'order_id': str(uuid.uuid4()),
        'stripe_session_id': session.get('id'),
        'email': metadata.get('email'),
        'cart': metadata.get('cart'), # The stringified cart
        'amount_total_cents': session.get('amount_total', 0),
        'status': 'paid',
        'ordered_at': int(time.time())
    }
    print(f"## Saving shop order for {metadata.get('email')}")
    shop_orders_table.put_item(Item=item_to_save)