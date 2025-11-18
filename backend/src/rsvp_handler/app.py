import json
import boto3
import os
import uuid
import time
import stripe

# --- AWS Clients ---
dynamodb = boto3.resource('dynamodb')
ses_client = boto3.client('ses')

# --- Environment Variables ---
RSVP_TABLE_NAME = os.environ.get('RSVP_TABLE_NAME')
API_DOMAIN = os.environ.get('API_DOMAIN') # e.g., https://api.cseweek.org/Prod
SES_FROM_EMAIL = os.environ.get('SES_FROM_EMAIL') # e.g., noreply@cseweek.org
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
FRONTEND_URL = os.environ.get('FRONTEND_URL') # e.g., https://cseweek.org

# --- Init Clients ---
table = dynamodb.Table(RSVP_TABLE_NAME)
stripe.api_key = STRIPE_SECRET_KEY

def lambda_handler(event, context):
    print(f"## Received event: {event}")
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        # --- 1. Validate Core Inputs ---
        name = body.get('name')
        email = body.get('email')
        if not name or not email:
            print("## Validation Failed: Missing name or email")
            return {'statusCode': 400, 'body': json.dumps({'error': 'Missing required fields'})}

        # --- 2. Generate Unique Codes ---
        confirmation_token = str(uuid.uuid4())
        referral_code = f"{name.split(' ')[0].upper()}-{str(uuid.uuid4())[:4]}"

        # --- 3. Create the Base RSVP Item ---
        item_to_save = {
            'email': email,
            'name': name,
            'school': body.get('school'),
            'rsvp_type': body.get('rsvp_type', 'general'),
            'I_am': body.get('I_am'),
            'is_confirmed': False,
            'confirmation_token': confirmation_token,
            'referral_code': referral_code,
            'base_tickets': 1,
            'referral_tickets': 0,
            'created_at': int(time.time()),
            'referred_by': body.get('referral_code')
        }
        
        # --- 4. Handle Optional Donation (for rsvp/family) ---
        donation_amount_cents = int(body.get('donation_amount_cents', 0))
        stripe_session_id = None

        if donation_amount_cents >= 100: # $1.00 minimum
            print(f"## Creating Stripe session for ${donation_amount_cents / 100}")
            is_anonymous = body.get('is_anonymous', False)
            
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {'name': 'CSE Week RSVP & Donation'},
                        'unit_amount': donation_amount_cents,
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=f"{FRONTEND_URL}/rsvp/success?status=Confirmed&donation=true",
                cancel_url=f"{FRONTEND_URL}/rsvp/family", # Or wherever they came from
                customer_email=email,
                metadata={
                    'name': name,
                    'email': email,
                    'is_anonymous': str(is_anonymous),
                    'source': 'rsvp-family'
                }
            )
            stripe_session_id = session.id
            item_to_save['donation_intent_id'] = stripe_session_id

        # --- 5. Save the Item to DynamoDB ---
        print(f"## Writing item to DynamoDB: {item_to_save}")
        table.put_item(Item=item_to_save)

        # --- 6. Send Confirmation Email ---
        confirmation_link = f"{API_DOMAIN}/confirm?token={confirmation_token}&email={email}"
        try:
            ses_client.send_email(
                Source=SES_FROM_EMAIL,
                Destination={'ToAddresses': [email]},
                Message={
                    'Subject': {'Data': 'Confirm your CSE Week RSVP!'},
                    'Body': {
                        'Html': {
                            'Data': f"<h3>Hi {name},</h3><p>Please confirm your RSVP for CSE Week by clicking the link below:</p><p><a href='{confirmation_link}'>Click here to confirm</a></p><p>Thank you!</p>"
                        }
                    }
                }
            )
            print(f"## Confirmation email sent to {email}")
        except Exception as e:
            print(f"## ERROR sending email: {e}")
            # Don't fail the whole request, but log the error

        # --- 7. Send Response ---
        return {
            'statusCode': 201,
            'body': json.dumps({
                'message': 'RSVP received! Please check your email to confirm.',
                'stripe_session_id': stripe_session_id # Frontend uses this to redirect
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}