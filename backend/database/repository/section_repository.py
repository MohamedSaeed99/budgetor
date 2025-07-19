from database.database import execute_query
from models.section import SectionEntity

def get_sections(user_id: str) -> list[SectionEntity]:
    query = "SELECT * FROM sections WHERE user_id = %s ORDER BY section_name"
    results = execute_query(query, (user_id,), fetch_all=True)
    
    if results is None:
        return []
    
    sections = []
    for result in results:
        section = SectionEntity(
            id=result['id'],
            user_id=result['user_id'],
            section_name=result['section_name']
        )
        sections.append(section)
    
    return sections

def create_section(section: SectionEntity) -> SectionEntity:
    query = """
        INSERT INTO sections (user_id, section_name)
        VALUES (%s, %s)
        RETURNING *
    """
    result = execute_query(
        query, 
        (section.user_id, section.section_name),
        fetch_one=True
    )
    
    if result is None:
        return None
    
    return SectionEntity(
        id=result['id'],
        user_id=result['user_id'],
        section_name=result['section_name']
    )

def update_section(section: SectionEntity) -> SectionEntity:
    query = """
        UPDATE sections 
        SET section_name = %s
        WHERE id = %s AND user_id = %s
        RETURNING *
    """
    result = execute_query(
        query,
        (section.section_name, section.id, section.user_id),
        fetch_one=True
    )
    
    if result is None:
        return None
    
    return SectionEntity(
        id=result['id'],
        user_id=result['user_id'],
        section_name=result['section_name']
    )

def delete_section(section_id: str, user_id: str) -> bool:
    query = "DELETE FROM sections WHERE id = %s AND user_id = %s"
    result = execute_query(query, (section_id, user_id))
    return result is not None and result > 0
