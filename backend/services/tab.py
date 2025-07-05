from models.tab import Tab, TabEntity
import database.repository.tab_repository as repository

def get_tabs(user_id: str):
    repository.get_tabs(user_id)

def create_tab(user_id: str, tab: TabEntity):
    repository.create_tab(tab.to_entity(user_id))

def upate_tab(user_id: str, tab: TabEntity):
    repository.update_tab(tab.to_entity(user_id))

def delete_tab(user_id: str, tab_id: str):
    repository.delete_tab(tab_id, user_id)