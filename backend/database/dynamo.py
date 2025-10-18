
import boto3

connection = boto3.resource(
    'dynamodb',
    region_name='us-east-1', 
    endpoint_url="http://localhost:8000" 
)

table = dynamodb.Table('budgetor')

def get_chat(chat_id: str, section_id: str):
    table.get_item(Key={
        'pk': chat_id,
        'sk': section_id
    })
    
def put_chat(chat_id: str, section_id: str, messages: list[str]):
    table.put_item(
        Item={
        'pk': chat_id,
        'sk': section_id,
        'messages': messages
    })