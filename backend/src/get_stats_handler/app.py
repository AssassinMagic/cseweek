import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('RSVP_TABLE_NAME'))

def lambda_handler(event, context):
    print("## Received request for RSVP total")
    
    try:
        # Scan to count only confirmed users.
        # This is fine for Phase 1. If it gets slow (5000+ RSVPs),
        # move to the "SiteStatsTable" pattern.
        response = table.scan(
            Select='COUNT',
            FilterExpression=boto3.dynamodb.conditions.Attr('is_confirmed').eq(True)
        )
        
        count = response.get('Count', 0)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'total_rsvp_count': count
            })
        }

    except Exception as e:
        print(f"## An error occurred: {e}")
        return {'statusCode': 500, 'body': json.dumps({'error': 'An internal server error occurred.'})}