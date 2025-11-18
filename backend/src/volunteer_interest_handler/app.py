import json
import boto3
import os
import uuid
import time

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('VOLUNTEER_INTEREST_TABLE_NAME'))

def lambda_handler(event, context):
    print(f"## Received event: {event}")
    
    try:
        body = json.loads(event.get('body', '{}'))
        name = body.get('name')
        email = body.get('email')

        if not name or not email:
            return {'statusCode': 400, 'body': json.dumps({'error': 'Missing required fields'})}

        item_to_save = {
            'id': str(uuid.uuid4()),
            'name': name,
            'email': email,
            'student_group': body.get('student_group'),
            'availability': body.get('availability'),
            'submitted_at': int(time.time())
        }
        
        table.put_item(Item=item_to_save)
        print("## Volunteer interest saved")

        return {
            'statusCode': 201,
            'body': json.dumps({ 'message': 'Volunteer interest received!' })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}