from models.section import Section
import database.repository.section_repository as repository

def get_sections(user_id: str):
    return [section.to_response() for section in repository.get_sections(user_id)]

def create_section(user_id: str, section: Section):
    repository.create_section(section.to_entity(user_id))

def upate_section(user_id: str, section: Section):
    repository.update_section(section.to_entity(user_id))

def delete_section(user_id: str, section_id: str):
    repository.delete_section(section_id, user_id)