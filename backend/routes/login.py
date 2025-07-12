from fastapi import APIRouter, HTTPException, status
from models.user import User
import services.login as login_service
from pydantic import BaseModel

class RefreshToken(BaseModel):
    refresh_token: str

router = APIRouter()

@router.post("/login")
async def login(user: User):
    return login_service.login(user)

@router.post("/register")
async def register(user: User):
    return login_service.register(user)

@router.post("/refresh")
async def refresh(token: RefreshToken):
    result = login_service.refresh_token(token.refresh_token)
    if "error" in result:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=result["error"])
    return result