from fastapi import APIRouter, Header
from utils.router import get_user_id_from_token
from models.purchase import Purchase
import services.purchase as purchase_service

router = APIRouter(
    prefix="/purchase"
)

@router.get("/{tab_id}")
async def get_purchases(tab_id: str, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    return purchase_service.get_purchases(user_id, tab_id)

@router.post("/")
async def create_purchase(purchase: Purchase, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    purchase_service.create_purchase(user_id, purchase)

@router.patch("/")
async def update_purchase(purchase: Purchase, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    purchase_service.update_purchase(user_id, purchase)

@router.delete("/")
async def delete_purchase(purchase: Purchase, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    purchase_service.delete_purchase(user_id, purchase)