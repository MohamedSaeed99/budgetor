from database.database import execute_query
from models.tab import TabEntity

def get_tabs(user_id: str) -> list[TabEntity]:
    query = "SELECT * FROM tabs WHERE user_id = %s"
    results = execute_query(query, (user_id,), fetch_all=True)
    
    if results is None:
        return []
    
    tabs = []
    for result in results:
        tab = TabEntity(
            id=result['id'],
            user_id=result['user_id'],
            section_id=result['section_id'],
            tab_name=result['tab_name']
        )
        tabs.append(tab)
    
    return tabs

def get_tabs_by_section(section_id: str, user_id: str) -> list[TabEntity]:
    query = "SELECT * FROM tabs WHERE section_id = %s AND user_id = %s"
    results = execute_query(query, (section_id, user_id), fetch_all=True)
    
    if results is None:
        return []
    
    tabs = []
    for result in results:
        tab = TabEntity(
            id=result['id'],
            user_id=result['user_id'],
            section_id=result['section_id'],
            tab_name=result['tab_name']
        )
        tabs.append(tab)
    
    return tabs

def create_tab(tab: TabEntity) -> TabEntity:
    query = """
        INSERT INTO tabs (user_id, section_id, tab_name)
        VALUES (%s, %s, %s)
        RETURNING *
    """
    result = execute_query(
        query, 
        (tab.user_id, tab.section_id, tab.tab_name),
        fetch_one=True
    )
    
    if result is None:
        return None
    
    return TabEntity(
        id=result['id'],
        user_id=result['user_id'],
        section_id=result['section_id'],
        tab_name=result['tab_name']
    )

def update_tab(tab: TabEntity) -> TabEntity:
    query = """
        UPDATE tabs 
        SET tab_name = %s
        WHERE id = %s AND user_id = %s AND section_id = %s
        RETURNING *
    """
    result = execute_query(
        query,
        (tab.section_id, tab.tab_name, tab.id, tab.user_id, tab.section_id),
        fetch_one=True
    )
    
    if result is None:
        return None
    
    return TabEntity(
        id=result['id'],
        user_id=result['user_id'],
        section_id=result['section_id'],
        tab_name=result['tab_name']
    )

def delete_tab(tab_id: str, user_id: str) -> bool:
    # First check if tab has any purchases
    check_query = "SELECT COUNT(*) FROM purchases WHERE tab_id = %s"
    purchase_count = execute_query(check_query, (tab_id,), fetch_one=True)
    
    if purchase_count and purchase_count['count'] > 0:
        return False
    
    query = "DELETE FROM tabs WHERE id = %s AND user_id = %s"
    result = execute_query(query, (tab_id, user_id))
    return result is not None and result > 0
