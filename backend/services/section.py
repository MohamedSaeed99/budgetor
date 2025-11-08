from models.section import Section
import database.repository.section_repository as repository

def get_sections(user_id: str):
    return [section for section in repository.get_sections(user_id)]

def create_section(user_id: str, section: Section):
    return repository.create_section(user_id, section)

def upate_section(user_id: str, section: Section):
    print(section)
    repository.update_section(user_id, section)

def delete_section(user_id: str, section_id: str):
    repository.delete_section(user_id, section_id)