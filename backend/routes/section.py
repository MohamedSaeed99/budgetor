from models.section import Section
from utils.router import get_user_id_from_token
import services.section as section_service

from fastapi import APIRouter, Header

router = APIRouter(
    prefix='/section'
)
    
@router.get("/")
async def get_sections(authorization: str = Header(...)) -> list[Section]:
    user_id = get_user_id_from_token(authorization)
    return section_service.get_sections(user_id)

@router.post("/")
async def create_section(section: Section, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    return section_service.create_section(user_id, section)
    
@router.patch("/")
async def update_section(section: Section, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    section_service.upate_section(user_id, section)

@router.delete("/{section_id}")
async def delete_section(section_id: str, authorization: str = Header(...)):
    user_id = get_user_id_from_token(authorization)
    section_service.delete_section(user_id, section_id)