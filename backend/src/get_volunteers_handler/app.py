import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('VOLUNTEER_INTEREST_TABLE_NAME'))

def lambda_handler(event, context):
    print("## Received request for volunteer list")
    
    try:
        response = table.scan(
            ProjectionExpression='name' # Only get the 'name' attribute
        )
        
        items = response.get('Items', [])
        # Get unique names
        names = list(set([item['name'] for item in items if 'name' in item]))
        names.sort()

        return {
            'statusCode': 200,
            'body': json.dumps({
                'count': len(names),
                'volunteers': names
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}