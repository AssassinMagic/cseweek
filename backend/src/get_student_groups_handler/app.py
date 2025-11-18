import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
# This table would be managed by Admins in the portal
table = dynamodb.Table(os.environ.get('STUDENT_GROUPS_TABLE_NAME'))

def lambda_handler(event, context):
    print("## Received request for student group list")
    
    try:
        # For Phase 1, we just scan. This table will be small.
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr('is_participating').eq(True)
        )
        items = response.get('Items', [])
        
        # Sort by name
        items.sort(key=lambda x: x.get('name', ''))

        return {
            'statusCode': 200,
            'body': json.dumps({
                'count': len(items),
                'student_groups': items
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}