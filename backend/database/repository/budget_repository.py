from backend.models.budget import Budget
from database.database import execute_query

def get_budget(section_id: str) -> list[Budget]:
    query = """
        SELECT * FROM budgets 
        WHERE section_id = %s 
        ORDER BY created_at DESC
    """
    results = execute_query(query, (section_id,), fetch_all=True)
    
    if results is None:
        return []
    
    budgets = []
    for result in results:
        budget = Budget(
            id=result['id'],
            section_id=result['section_id'],
            amount=float(result['amount']),
            period=result['budget_period'],
            created_at=result['created_at'],
            updated_at=result['updated_at']
        )
        
        budget.append(budget)

    return budgets

def create_budget(budget: Budget):
    query = """
        INSERT INTO budgets (section_id, budget_amount, budget_period)
        VALUES (%s, %s, %s)
    """
    execute_query(
        query, 
        (budget.section_id, budget.amount, budget.period)
    )

def update_budget(budget: Budget):
    query = """
        UPDATE budgets 
        SET amount = %s, budget_period = %s updated_at = CURRENT_TIMESTAMP
        WHERE id = %s AND section_id = %s
    """
    execute_query(
        query,
        (budget.amount, budget.period, budget.id, budget.section_id)
    )

def delete_budget(budget_id: int, section_id: str) -> bool:
    query = "DELETE FROM budgets WHERE id = %s AND section_id = %s"
    result = execute_query(query, (budget_id, section_id))
    return result is not None and result > 0