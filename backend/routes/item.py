from fastapi import APIRouter
from models.item import Item

router = APIRouter(
    prefix="/item"
)

@router.get("/")
async def get_items():
    return [{"item": "test_item"}]

@router.post("/")
async def create_item(item: Item):
    return None

@router.patch("/")
async def update_item(item: Item):
    return None

async def delete_item(item: Item):
    return None