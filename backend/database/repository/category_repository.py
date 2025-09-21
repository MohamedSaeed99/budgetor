from database.database import execute_query
from models.category import CategoryEntity

def get_categories(user_id: str, section_id: str) -> list[CategoryEntity]:
    query = """
        SELECT * FROM categories 
        WHERE user_id = %s AND section_id = %s 
        ORDER BY created_at DESC
    """
    results = execute_query(query, (user_id, tab_id), fetch_all=True)
    
    if results is None:
        return []
    
    categories = []
    for result in results:
        category = CategoryEntity(
            id=result['id'],
            user_id=result['user_id'],
            section_id=result['section_id'],
            category_name=result['category_name'],
            budget_amount=float(result['budget_amount']),
            created_at=result['created_at'],
            updated_at=result['updated_at']
        )
        categories.append(purchase)
    
    return categories

def create_category(category: CategoryEntity):
    query = """
        INSERT INTO categories (user_id, section_id, budget_amount, category_name)
        VALUES (%s, %s, %s, %s)
    """
    execute_query(
        query, 
        (purchase.user_id, purchase.tab_id, purchase.purchase_date, purchase.store, purchase.amount, purchase.category)
    )

def update_category(category: CategoryEntity):
    query = """
        UPDATE categories 
        SET budget_amount = %s, category_name = %s updated_at = CURRENT_TIMESTAMP
        WHERE id = %s AND user_id = %s AND section_id = %s
    """
    execute_query(
        query,
        (category.budget_amount, category.category_name, category.id, category.user_id, category.section_id)
    )

def delete_category(category_id: int, user_id: str) -> bool:
    query = "DELETE FROM categories WHERE id = %s AND user_id = %s"
    result = execute_query(query, (category_id, user_id))
    return result is not None and result > 0