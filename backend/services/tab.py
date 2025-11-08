from models.tab import Tab
import database.repository.tab_repository as repository

def get_tabs(section_id: str):
    return [tab for tab in repository.get_tabs_by_section(section_id)]

def create_tab(tab: Tab):
    return repository.create_tab(tab)

def update_tab(tab: Tab):
    repository.update_tab(tab)

def delete_tab(tab_id: str):
    repository.delete_tab(tab_id)