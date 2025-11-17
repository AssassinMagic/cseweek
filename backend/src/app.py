import json
import boto3
import os

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Get the table name from the environment variable we set in template.yaml
RSVP_TABLE_NAME = os.environ.get('RSVP_TABLE_NAME')
table = dynamodb.Table(RSVP_TABLE_NAME)

def lambda_handler(event, context):
    """
    This function handles all RSVP submissions.
    It now saves extra fields like 'school' and 'rsvp_type'.
    """
    
    print(f"## Received event: {event}")
    
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
                'headers': { 'Access-Control-Allow-Origin': '*' },
                'body': json.dumps({'error': 'Missing required fields: name and email'})
            }

        # --- NEW: Get optional fields ---
        school = body.get('school') # Will be None if not provided
        rsvp_type = body.get('rsvp_type', 'general') # Default to 'general'

        # 3. Create the item to save
        item_to_save = {
            'email': email,
            'name': name,
            'rsvp_type': rsvp_type
            # We add optional fields *only* if they exist
        }
        
        if school:
            item_to_save['school'] = school
        
        # (In the future, you could add 'company' for family RSVPs, etc.)

        # 4. Save the item to DynamoDB
        print(f"## Writing item to DynamoDB: {item_to_save}")
        table.put_item(Item=item_to_save)

        # 5. Send a successful response
        print("## Write successful")
        return {
            'statusCode': 201,
            'headers': { 'Access-Control-Allow-Origin': '*' },
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
            'headers': { 'Access-Control-Allow-Origin': '*' },
            'body': json.dumps({'error': 'An internal server error occurred.'})
        }