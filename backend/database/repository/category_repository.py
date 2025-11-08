from database.database import execute_query
from models.category import Category

def get_categories(budget_id: str) -> list[Category]:
    query = """
        SELECT * FROM categories 
        WHERE budget_id = %s 
        ORDER BY created_at DESC
    """
    results = execute_query(query, (budget_id,), fetch_all=True)
    
    if results is None:
        return []
    
    categories = []
    for result in results:
        category = Category(
            id=result['id'],
            budget_id=result['budget_id'],
            category_name=result['category_name'],
            amount=float(result['amount']),
            created_at=result['created_at'],
            updated_at=result['updated_at']
        )
        categories.append(category)
    
    return categories

def create_category(category: Category):
    query = """
        INSERT INTO categories (budget_id, amount, category_name)
        VALUES (%s, %s, %s)
    """
    execute_query(
        query, 
        (category.budget_id, category.amount, category.category_name)
    )

def update_category(category: Category):
    query = """
        UPDATE categories 
        SET amount = %s, category_name = %s updated_at = CURRENT_TIMESTAMP
        WHERE id = %s AND budget_id = %s
    """
    execute_query(
        query,
        (category.amount, category.category_name, category.id, category.budget_id)
    )

def delete_category(category_id: int) -> bool:
    query = "DELETE FROM categories WHERE id = %s"
    result = execute_query(query, category_id)
    return result is not None and result > 0