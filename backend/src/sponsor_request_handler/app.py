import json
import boto3
import os
import uuid
import time

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('SPONSORS_TABLE_NAME'))

def lambda_handler(event, context):
    print(f"## Received event: {event}")
    
    try:
        body = json.loads(event.get('body', '{}'))
        name = body.get('name')
        email = body.get('email')
        company_name = body.get('company_name')

        if not name or not email or not company_name:
            return {'statusCode': 400, 'body': json.dumps({'error': 'Missing required fields'})}

        item_to_save = {
            'id': str(uuid.uuid4()),
            'name': name,
            'email': email,
            'company_name': company_name,
            'message': body.get('message'),
            'submitted_at': int(time.time())
        }
        
        table.put_item(Item=item_to_save)
        print("## Sponsor request saved")

        return {
            'statusCode': 201,
            'body': json.dumps({ 'message': 'Sponsor request received!' })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}