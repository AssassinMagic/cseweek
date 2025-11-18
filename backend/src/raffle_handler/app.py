import json
import boto3
import os

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Get the table name from the environment variable
RAFFLE_TABLE_NAME = os.environ.get('RAFFLE_TABLE_NAME')
table = dynamodb.Table(RAFFLE_TABLE_NAME)

# NOTE: All CORS headers and OPTIONS requests are now
# handled by API Gateway, defined in template.yaml.
# No CORS code is needed here.

def lambda_handler(event, context):
    """
    This function handles the POST /raffle request.
    """
    
    print(f"## Received event: {event}")
    
    # We only get POST requests, so no need to check http_method
    
    try:
        # 1. Parse the incoming request body
        body = json.loads(event.get('body', '{}'))

        email = body.get('email')

        if not email:
            print("## Validation Failed: Missing email")
            return {
                'statusCode': 400,
                # 'headers' is no longer needed
                'body': json.dumps({'error': 'Missing required fields: email'})
            }
        
        # 3. Create the item to save
        item_to_save = {
            'email': email,
        }
        
        # 4. Save the item to DynamoDB
        print(f"## Writing item to DynamoDB: {item_to_save}")
        table.put_item(Item=item_to_save)

        # 5. Send a successful response
        print("## Write successful")
        return {
            'statusCode': 201,
            # 'headers' is no longer needed
            'body': json.dumps({
                'message': 'Raffle entry successful!',
                'received_data': item_to_save
            })
        }

    except Exception as e:
        # Handle any unexpected errors
        print(f"## An error occurred: {e}")
        return {
            'statusCode': 500,
            # 'headers' is no longer needed
            'body': json.dumps({'error': 'An internal server error occurred.'})
        }