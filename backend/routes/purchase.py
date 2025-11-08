from fastapi import APIRouter, Header
from utils.router import get_user_id_from_token
from models.purchase import Purchase
import services.purchase as purchase_service

router = APIRouter(
    prefix="/purchase"
)

@router.get("/{tab_id}")
async def get_purchases(tab_id: str):
    return purchase_service.get_purchases(tab_id)

@router.post("/")
async def create_purchase(purchase: Purchase):
    purchase_service.create_purchase(purchase)

@router.patch("/")
async def update_purchase(purchase: Purchase):
    purchase_service.update_purchase(purchase)

@router.delete("/{purchase_id}")
async def delete_purchase(purchase_id: str):
    purchase_service.delete_purchase(purchase_id)