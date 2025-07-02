import bcrypt

from database.repository.login_repository import get_user_by_email, create_user
from models.user import User, UserEntity
from utils.authentication import AuthenticationUtils

def login(user: User):
    auth_utils = AuthenticationUtils()
    db_user = get_user_by_email(user.email)
    if not bcrypt.checkpw(user.password.encode("utf-8"), db_user['password_hash'].encode("utf-8")):
        print("invalid password")
        return
    
    user_data = {"sub": str(db_user["id"]), "email": db_user["email"]}
    return {
        "access_token": auth_utils.create_access_token(user_data), 
        "refresh_token": auth_utils.create_refresh_token(user_data),
        "token_type": "bearer"
    }

def register(user: User):
    auth_utils = AuthenticationUtils()
    salt = bcrypt.gensalt(rounds=12)
    hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), salt)
    db_user = create_user(UserEntity(full_name=user.full_name, email=user.email, password_hash=hashed_password))

    user_data = {"sub": str(db_user["id"]), "email": db_user["email"]}
    return { 
        "access_token": auth_utils.create_access_token(user_data), 
        "refresh_token": auth_utils.create_refresh_token(user_data),
        "token_type": "bearer"
    }


def refresh_token(refresh_token: str):
    auth_utils = AuthenticationUtils()
    try:
        result = auth_utils.refresh_access_token(refresh_token)
        return {
            "access_token": result["access_token"],
            "token_type": "bearer"
        }
    except Exception as e:
        return {"error": str(e)} 
