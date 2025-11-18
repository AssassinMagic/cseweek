import json
import boto3
import os
import uuid # To generate unique IDs
import time

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Get the table name from the environment variable we set in template.yaml
CONTACT_TABLE_NAME = os.environ.get('CONTACT_TABLE_NAME')
table = dynamodb.Table(CONTACT_TABLE_NAME)

# Note: The CORS headers are now handled by API Gateway,
# so we don't need the big CORS_HEADERS variable in our Python code anymore.

def lambda_handler(event, context):
    """
    This function handles the contact form.
    It's completely separate from the RSVP function.
    """
    
    print(f"## Received event: {event}")

    # The OPTIONS preflight request is now handled automatically
    # by API Gateway, so we don't need to check for it.
    
    try:
        body = json.loads(event.get('body', '{}'))
        name = body.get('name')
        email = body.get('email')
        message = body.get('message')

        if not name or not email or not message:
            print("## Validation Failed: Missing fields")
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields'})
            }

        # Create the item to save
        item_to_save = {
            'id': str(uuid.uuid4()), # Generate a unique ID
            'name': name,
            'email': email,
            'message': message,
            'received_at': int(time.time())
        }
        
        # Save the item to DynamoDB
        print(f"## Writing item to DynamoDB: {item_to_save}")
        table.put_item(Item=item_to_save)

        # Send a successful response
        print("## Write successful")
        return {
            'statusCode': 201,
            'body': json.dumps({ 'message': 'Message received!' })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'An internal server error occurred.'})
        }