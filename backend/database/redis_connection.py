import redis
import json 
def connect():
    try:
        r = redis.Redis(host='localhost', port=6379, decode_responses=True)
        r.ping()
        return r
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        
def add_message(section_id: str, message: dict):
    r = connect()
    r.rpush(f"messages_{section_id}:list", json.dumps(message))
    
def get_messages(section_id: str) -> list[str]:
    r = connect()
    return [json.loads(message) for message in r.lrange(f"messages_{section_id}:list", 0, -1)]