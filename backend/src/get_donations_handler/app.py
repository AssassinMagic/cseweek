import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('DONATIONS_TABLE_NAME'))
INDEX_NAME = 'PublicDonationsIndex' # The GSI defined in template.yaml

def lambda_handler(event, context):
    print("## Received request for public donor list")
    
    try:
        # Query the GSI for 'is_public' = 'TRUE'
        # Sorts by 'donated_at' (newest first)
        response = table.query(
            IndexName=INDEX_NAME,
            KeyConditionExpression=boto3.dynamodb.conditions.Key('is_public').eq('TRUE'),
            ScanIndexForward=False 
        )
        
        items = response.get('Items', [])
        
        # Format the list for public consumption
        public_list = [
            {
                'name': item.get('name'),
                'amount_cents': int(item.get('amount_cents', 0)) # Ensure it's an int
            }
            for item in items
        ]

        return {
            'statusCode': 200,
            'body': json.dumps({
                'count': len(public_list),
                'donors': public_list
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}