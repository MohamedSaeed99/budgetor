from fastapi import HTTPException, Header, status

from utils.authentication import AuthenticationUtils

def get_user_id_from_token(authorization: str = Header(...)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing Authorization header")
    token = authorization.split(" ", 1)[1]
    auth_utils = AuthenticationUtils()
    try:
        user_id = auth_utils.get_current_user(token)
        return user_id
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))