import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('SHOP_ITEM_TABLE_NAME'))

def lambda_handler(event, context):
    print("## Received request for shop item list")
    
    try:
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr('is_visible').eq(True)
        )
        
        items = response.get('Items', [])
        items.sort(key=lambda x: x.get('name', ''))

        return {
            'statusCode': 200,
            'body': json.dumps({
                'count': len(items),
                'items': items
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}