from models.tab import Tab
from utils.router import get_user_id_from_token
import services.tab as tab_service

from fastapi import APIRouter, Header

router = APIRouter(
    prefix='/tab'
)

@router.get("/{section_id}")
async def get_tabs(section_id:str, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    return tab_service.get_tabs(user_id, section_id)

@router.post("/")
async def create_tab(tab: Tab, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    tab_service.create_tab(user_id, tab)

@router.patch("/")
async def update_tab(tab: Tab, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    tab_service.updateTab(user_id, tab)

@router.delete("/")
async def delete_tab(tab_id: str, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    tab_service.delete_tab(user_id, tab_id)