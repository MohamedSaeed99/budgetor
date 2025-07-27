from models.tab import TabEntity
import database.repository.tab_repository as repository

def get_tabs(user_id: str, section_id: str):
    return [tab.to_response() for tab in repository.get_tabs_by_section(section_id, user_id)]

def create_tab(user_id: str, tab: TabEntity):
    repository.create_tab(tab.to_entity(user_id))

def update_tab(user_id: str, tab: TabEntity):
    repository.update_tab(tab.to_entity(user_id))

def delete_tab(user_id: str, tab_id: str):
    repository.delete_tab(tab_id, user_id)