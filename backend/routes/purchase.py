from fastapi import APIRouter, Header, HTTPException, status
from models.purchase import Purchase
from utils.authentication import AuthenticationUtils
from services.purchase import get_purchases as get_purchases_service

router = APIRouter(
    prefix="/purchase"
)

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

@router.get("/")
async def get_purchases(authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    return get_purchases_service(user_id)

@router.post("/")
async def create_purchase(purchase: Purchase, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    # TODO: Create purchase for user_id
    return {"user_id": user_id, "purchase": purchase}

@router.patch("/")
async def update_purchase(purchase: Purchase, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    # TODO: Update purchase for user_id
    return {"user_id": user_id, "purchase": purchase}

@router.delete("/")
async def delete_purchase(purchase: Purchase, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    # TODO: Delete purchase for user_id
    return {"user_id": user_id, "purchase": purchase}