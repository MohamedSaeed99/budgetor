from database.database import execute_query
from models.tab import Tab

def get_tabs_by_section(section_id: str) -> list[Tab]:
    query = "SELECT * FROM tabs WHERE section_id = %s"
    results = execute_query(query, section_id, fetch_all=True)
    
    if results is None:
        return []
    
    tabs = []
    for result in results:
        tab = Tab(
            id=result['id'],
            section_id=result['section_id'],
            tab_name=result['tab_name']
        )
        tabs.append(tab)
    
    return tabs

def create_tab(tab: Tab) -> Tab:
    query = """
        INSERT INTO tabs (section_id, tab_name)
        VALUES (%s, %s)
        RETURNING *
    """
    result = execute_query(
        query, 
        (tab.section_id, tab.tab_name),
        fetch_one=True
    )
    
    if result is None:
        return None
    
    return Tab(
        id=result['id'],
        section_id=result['section_id'],
        tab_name=result['tab_name']
    )

def update_tab(tab: Tab) -> Tab:
    query = """
        UPDATE tabs 
        SET tab_name = %s
        WHERE id = %s AND section_id = %s
        RETURNING *
    """
    result = execute_query(
        query,
        (tab.tab_name, tab.id, tab.section_id),
        fetch_one=True
    )
    
    if result is None:
        return None
    
    return Tab(
        id=result['id'],
        section_id=result['section_id'],
        tab_name=result['tab_name']
    )

def delete_tab(tab_id: str) -> bool:
    query = "DELETE FROM tabs WHERE id = %s"
    result = execute_query(query, tab_id)
    return result is not None and result > 0
