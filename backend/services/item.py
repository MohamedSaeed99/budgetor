from database.database import execute_query

def get_items(user_id):
    query = f"SELECT * FROM items WHERE user = {user_id}"
    return execute_query(query)