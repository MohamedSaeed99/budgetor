from database.database import execute_query
from models.user import UserEntity

def get_user_by_email(email: str) -> UserEntity:
    query = "SELECT * FROM users WHERE email = %s"
    return execute_query(query, (email,), fetch_one=True)

def create_user(user: UserEntity):
    query = "INSERT INTO users(full_name, email, password_hash) VALUES(%s, %s, %s)"
    return execute_query(query, (user.full_name, user.email, user.password_hash), fetch_one=True)