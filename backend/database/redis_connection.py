import redis

def connect():
    try:
        r = redis.Redis(host='localhost', port=6379, decode_responses=True)
        r.ping()
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        
def add_message(section_id: str, messages: list[str]):
    r = connect()
    r.set(f"messages_{section_id}", messages)
    
def get_messages(section_id: str):
    r = connect()
    return r.get(f"messages_{section_id}")