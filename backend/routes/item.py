from fastapi import APIRouter
from models.item import Item
import services.item as item_service

router = APIRouter(
    prefix="/item"
)

@router.get("/")
async def get_items():
    return item_service.get_items("test")


@router.post("/")
async def create_item(item: Item):
    return None

@router.patch("/")
async def update_item(item: Item):
    return None

async def delete_item(item: Item):
    return None