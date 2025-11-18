import json
import os
import stripe

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
FRONTEND_URL = os.environ.get('FRONTEND_URL')

def lambda_handler(event, context):
    print(f"## Received event: {event}")
    body = json.loads(event.get('body', '{}'))

    try:
        name = body.get('name')
        email = body.get('email')
        amount_cents = int(body.get('amount_cents'))
        is_anonymous = body.get('is_anonymous', False)

        if amount_cents < 100: # $1.00 minimum
            return {'statusCode': 400, 'body': json.dumps({'error': 'Donation must be at least $1.00'})}

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {'name': 'CSE Week Donation'},
                    'unit_amount': amount_cents,
                },'quantity': 1,
            }],
            mode='payment',
            success_url=f"{FRONTEND_URL}/donate/success",
            cancel_url=f"{FRONTEND_URL}/donate",
            customer_email=email,
            metadata={
                'name': name,
                'email': email,
                'is_anonymous': str(is_anonymous),
                'source': 'donate-page'
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'id': session.id}) # Frontend uses this to redirect
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': str(e)})}