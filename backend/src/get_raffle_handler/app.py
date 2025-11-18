import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('RSVP_TABLE_NAME'))
FRONTEND_URL = os.environ.get('FRONTEND_URL')

def lambda_handler(event, context):
    print(f"## Received event: {event}")
    
    try:
        email = event.get('pathParameters', {}).get('email')
        if not email:
            return {'statusCode': 400, 'body': json.dumps({'error': 'Email is required'})}

        # 1. Get the user from DynamoDB
        response = table.get_item(Key={'email': email})
        if 'Item' not in response:
            return {'statusCode': 404, 'body': json.dumps({'error': 'User not found'})}
        
        user = response['Item']
        
        # 2. Calculate tickets
        is_confirmed = user.get('is_confirmed', False)
        base_tickets = 0
        pending_tickets = 0
        
        if is_confirmed:
            base_tickets = user.get('base_tickets', 0)
        else:
            pending_tickets = user.get('base_tickets', 0)
            
        referral_tickets = user.get('referral_tickets', 0)
        total_tickets = base_tickets + referral_tickets
        
        # 3. Create referral link
        referral_code = user.get('referral_code', '')
        referral_link = f"{FRONTEND_URL}/rsvp/student?ref={referral_code}"

        # 4. Return the data
        return {
            'statusCode': 200,
            'body': json.dumps({
                'email': email,
                'is_confirmed': is_confirmed,
                'total_tickets': total_tickets,
                'pending_tickets': pending_tickets,
                'base_tickets': base_tickets,
                'referral_tickets': referral_tickets,
                'referral_link': referral_link,
                'referral_code': referral_code
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}