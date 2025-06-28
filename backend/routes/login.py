from fastapi import APIRouter
from models.user import UserClient
from services.login import login as login_service, register as register_service

router = APIRouter()

@router.post("/login")
async def login(user: UserClient):
    return login_service(user)

@router.post("/register")
async def register(user: UserClient):
    return register_service(user)