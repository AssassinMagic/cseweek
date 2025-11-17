import json
import boto3
import os

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Get the table name from the environment variable we set in template.yaml
RSVP_TABLE_NAME = os.environ.get('RSVP_TABLE_NAME')
table = dynamodb.Table(RSVP_TABLE_NAME)

# --- Define our CORS headers so we can reuse them ---
CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*', # Allows any domain to call your API
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'OPTIONS,POST' # We only allow POST and OPTIONS
}

def lambda_handler(event, context):
    """
    This function handles all RSVP submissions.
    It now handles the OPTIONS preflight request for CORS.
    """
    
    print(f"## Received event: {event}")
    
    # --- Handle the browser's preflight OPTIONS request ---
    http_method = event.get('httpMethod')
    if http_method == 'OPTIONS':
        print("## Returning CORS preflight response")
        return {
            'statusCode': 200,
            'headers': CORS_HEADERS, # <-- Use the full headers
            'body': json.dumps({'message': 'CORS preflight OK'})
        }
    
    # --- This is your POST logic ---
    try:
        # 1. Parse the incoming request body
        body = json.loads(event.get('body', '{}'))

        # 2. Validate the required input
        name = body.get('name')
        email = body.get('email')

        if not name or not email:
            print("## Validation Failed: Missing name or email")
            return {
                'statusCode': 400,
                'headers': CORS_HEADERS, # <-- Use the full headers
                'body': json.dumps({'error': 'Missing required fields: name and email'})
            }

        # --- Get optional fields ---
        school = body.get('school') # Will be None if not provided
        rsvp_type = body.get('rsvp_type', 'general') # Default to 'general'

        # 3. Create the item to save
        item_to_save = {
            'email': email,
            'name': name,
            'rsvp_type': rsvp_type
        }
        
        if school:
            item_to_save['school'] = school
        
        # 4. Save the item to DynamoDB
        print(f"## Writing item to DynamoDB: {item_to_save}")
        table.put_item(Item=item_to_save)

        # 5. Send a successful response
        print("## Write successful")
        return {
            'statusCode': 201,
            'headers': CORS_HEADERS, # <-- Use the full headers
            'body': json.dumps({
                'message': 'RSVP successful!',
                'received_data': item_to_save
            })
        }

    except Exception as e:
        # Handle any unexpected errors
        print(f"## An error occurred: {e}")
        return {
            'statusCode': 500,
            'headers': CORS_HEADERS, # <-- Use the full headers
            'body': json.dumps({'error': 'An internal server error occurred.'})
        }