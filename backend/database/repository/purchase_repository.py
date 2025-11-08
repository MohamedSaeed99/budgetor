from database.database import execute_query
from models.purchase import Purchase

def get_purchases(tab_id: str) -> list[Purchase]:
    query = """
        SELECT * FROM purchases 
        WHERE tab_id = %s 
        ORDER BY created_at DESC
    """
    results = execute_query(query, tab_id, fetch_all=True)
    
    if results is None:
        return []
    
    purchases = []
    for result in results:
        purchase = Purchase(
            id=result['id'],
            tab_id=result['tab_id'],
            purchase_date=result['purchase_date'],
            store=result['store'],
            amount=float(result['amount']),
            category=result['category'],
            created_at=result['created_at'],
            updated_at=result['updated_at']
        )
        purchases.append(purchase)
    
    return purchases

def create_purchase(purchase: Purchase):
    query = """
        INSERT INTO purchases (tab_id, purchase_date, store, amount, category)
        VALUES (%s, %s, %s, %s, %s)
    """
    execute_query(
        query, 
        (purchase.tab_id, purchase.purchase_date, purchase.store, purchase.amount, purchase.category)
    )

def update_purchase(purchase: Purchase):
    query = """
        UPDATE purchases 
        SET purchase_date = %s, store = %s, amount = %s, category = %s, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s AND tab_id = %s
    """
    execute_query(
        query,
        (purchase.purchase_date, purchase.store, purchase.amount, purchase.category, purchase.id, purchase.tab_id)
    )

def delete_purchase(purchase_id: int) -> bool:
    query = "DELETE FROM purchases WHERE id = %s"
    result = execute_query(query, purchase_id)
    return result is not None and result > 0