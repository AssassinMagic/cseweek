import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('EVENTS_TABLE_NAME'))

def lambda_handler(event, context):
    print("## Received request for event list")
    
    try:
        # Scan for events that are approved
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr('status').eq('approved')
        )
        
        items = response.get('Items', [])
        
        # Sort by start time
        items.sort(key=lambda x: x.get('start_time', 0))

        return {
            'statusCode': 200,
            'body': json.dumps({
                'count': len(items),
                'events': items
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}