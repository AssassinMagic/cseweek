import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('RSVP_TABLE_NAME'))
FRONTEND_URL = os.environ.get('FRONTEND_URL')

def lambda_handler(event, context):
    print(f"## Received event: {event}")
    
    try:
        # 1. Get token and email from the URL
        params = event.get('queryStringParameters', {})
        token = params.get('token')
        email = params.get('email')

        if not token or not email:
            return redirect(f"{FRONTEND_URL}/rsvp/error?code=MissingParams")

        # 2. Get the user from DynamoDB
        response = table.get_item(Key={'email': email})
        if 'Item' not in response:
            return redirect(f"{FRONTEND_URL}/rsvp/error?code=UserNotFound")
        
        item = response['Item']

        # 3. Check if already confirmed
        if item.get('is_confirmed', False):
            return redirect(f"{FRONTEND_URL}/rsvp/success?status=AlreadyConfirmed")
        
        # 4. Check if token is valid
        if item.get('confirmation_token') == token:
            print("## Token valid. Confirming user...")
            
            # Update the user to be confirmed
            table.update_item(
                Key={'email': email},
                UpdateExpression="SET is_confirmed = :true REMOVE confirmation_token",
                ExpressionAttributeValues={':true': True}
            )
            
            # 5. Award referral tickets if applicable
            if item.get('referred_by'):
                referrer_code = item['referred_by']
                print(f"## User was referred by {referrer_code}. Awarding tickets...")
                
                # We must scan to find the referrer by their code.
                # A GSI on 'referral_code' would be much faster here.
                response = table.scan(
                    FilterExpression=boto3.dynamodb.conditions.Attr('referral_code').eq(referrer_code)
                )
                
                if response.get('Items'):
                    referrer = response['Items'][0]
                    print(f"## Found referrer: {referrer['email']}")
                    table.update_item(
                        Key={'email': referrer['email']},
                        UpdateExpression="SET referral_tickets = if_not_exists(referral_tickets, :zero) + :two",
                        ExpressionAttributeValues={':zero': 0, ':two': 2}
                    )
                else:
                    print(f"## Referrer with code {referrer_code} not found.")

            return redirect(f"{FRONTEND_URL}/rsvp/success?status=Confirmed")
        
        else:
            print("## Invalid token")
            return redirect(f"{FRONTEND_URL}/rsvp/error?code=InvalidToken")

    except Exception as e:
        print(f"## An error occurred: {e}")
        return redirect(f"{FRONTEND_URL}/rsvp/error?code=ServerError")

def redirect(url):
    """Helper function to return a 302 redirect."""
    return {'statusCode': 302, 'headers': {'Location': url}}