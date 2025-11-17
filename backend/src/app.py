import json
import boto3
import os

# Initialize the DynamoDB client
# We do this *outside* the handler so it can be reused across connections
dynamodb = boto3.resource('dynamodb')

# Get the table name from the environment variable we set in template.yaml
RSVP_TABLE_NAME = os.environ.get('RSVP_TABLE_NAME')
table = dynamodb.Table(RSVP_TABLE_NAME)

def lambda_handler(event, context):
    """
    This function is triggered by API Gateway when a POST request is made to /rsvp.
    It takes the JSON body from the request and saves it to DynamoDB.
    """
    
    print(f"## Received event: {event}") # This is key for debugging!
    
    try:
        # 1. Parse the incoming request body
        # The body comes in as a JSON string, so we need to parse it
        body = json.loads(event.get('body', '{}'))

        # 2. Validate the input
        name = body.get('name')
        email = body.get('email')

        if not name or not email:
            print("## Validation Failed: Missing name or email")
            return {
                'statusCode': 400, # 400 = Bad Request
                'headers': { 'Access-Control-Allow-Origin': '*' }, # Required for CORS
                'body': json.dumps({'error': 'Missing required fields: name and email'})
            }

        # 3. Create the item to save
        item_to_save = {
            'email': email, # This is our Primary Key
            'name': name
            # You can add more fields here, like 'rsvp_date', etc.
        }

        # 4. Save the item to DynamoDB
        print(f"## Writing item to DynamoDB: {item_to_save}")
        table.put_item(Item=item_to_save)

        # 5. Send a successful response
        print("## Write successful")
        return {
            'statusCode': 201, # 201 = Created
            'headers': { 'Access-Control-Allow-Origin': '*' }, # Required for CORS
            'body': json.dumps({
                'message': 'RSVP successful!',
                'received_data': item_to_save
            })
        }

    except Exception as e:
        # Handle any unexpected errors
        print(f"## An error occurred: {e}")
        return {
            'statusCode': 500, # 500 = Internal Server Error
            'headers': { 'Access-Control-Allow-Origin': '*' }, # Required for CORS
            'body': json.dumps({'error': 'An internal server error occurred.'})
        }