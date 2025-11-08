import json
from fastapi import APIRouter, Header
import services.budget as budget_service

router = APIRouter(
    prefix="/budget"
)

@router.get("/{section_id}")
async def get_budget(section_id: str):
    return budget_service.get_budget(section_id)

@router.post("/")
async def add_budget():
    return budget_service.add_budget(tab_id)
