import json
import boto3
import uuid
import os
from datetime import datetime
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TODOS_TABLE'])

def lambda_handler(event, context):
    try:
        http_method = event['httpMethod']
        user_id = event['requestContext']['authorizer']['claims']['sub']
        
        if http_method == 'GET':
            return get_todos(user_id)
        elif http_method == 'POST':
            return create_todo(user_id, json.loads(event['body']))
        elif http_method == 'PUT':
            return update_todo(user_id, json.loads(event['body']))
        elif http_method == 'DELETE':
            todo_id = event['pathParameters']['id']
            return delete_todo(user_id, todo_id)
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }

def get_todos(user_id):
    response = table.query(KeyConditionExpression=Key('userId').eq(user_id))
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(response['Items'])
    }

def create_todo(user_id, todo_data):
    todo_id = str(uuid.uuid4())
    item = {
        'userId': user_id,
        'todoId': todo_id,
        'text': todo_data['text'],
        'completed': False,
        'createdAt': datetime.utcnow().isoformat()
    }
    table.put_item(Item=item)
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(item)
    }

def update_todo(user_id, todo_data):
    table.update_item(
        Key={'userId': user_id, 'todoId': todo_data['todoId']},
        UpdateExpression='SET #text = :text, completed = :completed',
        ExpressionAttributeNames={'#text': 'text'},
        ExpressionAttributeValues={
            ':text': todo_data['text'],
            ':completed': todo_data['completed']
        }
    )
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'message': 'Todo updated successfully'})
    }

def delete_todo(user_id, todo_id):
    table.delete_item(Key={'userId': user_id, 'todoId': todo_id})
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'message': 'Todo deleted successfully'})
    }
