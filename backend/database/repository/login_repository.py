from database.database import execute_query
from models.user import UserEntity

def get_user_by_email(email: str) -> UserEntity:
    query = "SELECT * FROM users WHERE email = %s"
    result = execute_query(query, (email,), fetch_one=True)
    if result is None:
        return []
    
    return UserEntity(
            id=result['id'],
            full_name=result['full_name'],
            email=result['email'],
            password_hash=result['password_hash']
        )

def create_user(user: UserEntity) -> UserEntity:
    query = """
        INSERT INTO users(full_name, email, password_hash) 
        VALUES(%s, %s, %s) 
        RETURNING *
    """
    result = execute_query(query, (user.full_name, user.email, user.password_hash), fetch_one=True)
    
    print(result['id'])

    if result is None:
        return []
    
    return UserEntity(
            id=result['id'],
            full_name=result['full_name'],
            email=result['email'],
            password_hash=result['password_hash']
        )
