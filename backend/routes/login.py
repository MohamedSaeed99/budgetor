from fastapi import APIRouter, HTTPException, status
from models.user import User
from services.login import login as login_service, register as register_service, refresh_token
from pydantic import BaseModel

class RefreshToken(BaseModel):
    refresh_token: str

router = APIRouter()

@router.post("/login")
async def login(user: User):
    return login_service(user)

@router.post("/register")
async def register(user: User):
    return register_service(user)

@router.post("/refresh")
async def refresh(token: RefreshToken):
    result = refresh_token(token.refresh_token)
    if "error" in result:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=result["error"])
    return result