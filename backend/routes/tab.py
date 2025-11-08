from models.tab import Tab
import services.tab as tab_service

from fastapi import APIRouter, Header

router = APIRouter(
    prefix='/tab'
)

@router.get("/{section_id}")
async def get_tabs(section_id:str):
    return tab_service.get_tabs(section_id)

@router.post("/")
async def create_tab(tab: Tab):
    return tab_service.create_tab(tab)

@router.patch("/")
async def update_tab(tab: Tab):
    tab_service.update_tab(tab)

@router.delete("/{tab_id}")
async def delete_tab(tab_id: str):
    tab_service.delete_tab(tab_id)