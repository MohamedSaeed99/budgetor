from database.database import execute_query
from models.purchase import PurchaseEntity

def get_purchases(user_id: str, tab_id: str) -> list[PurchaseEntity]:
    query = """
        SELECT * FROM purchases 
        WHERE user_id = %s AND tab_id = %s 
        ORDER BY created_at DESC
    """
    results = execute_query(query, (user_id, tab_id), fetch_all=True)
    
    if results is None:
        return []
    
    purchases = []
    for result in results:
        purchase = PurchaseEntity(
            id=result['id'],
            user_id=result['user_id'],
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

def create_purchase(purchase: PurchaseEntity):
    query = """
        INSERT INTO purchases (user_id, tab_id, purchase_date, store, amount, category)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    execute_query(
        query, 
        (purchase.user_id, purchase.tab_id, purchase.purchase_date, purchase.store, purchase.amount, purchase.category)
    )

def update_purchase(purchase: PurchaseEntity):
    query = """
        UPDATE purchases 
        SET purchase_date = %s, store = %s, amount = %s, category = %s, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s AND user_id = %s AND tab_id = %s
    """
    execute_query(
        query,
        (purchase.purchase_date, purchase.store, purchase.amount, purchase.category, purchase.id, purchase.user_id, purchase.tab_id)
    )

def delete_purchase(purchase_id: int, user_id: str) -> bool:
    query = "DELETE FROM purchases WHERE id = %s AND user_id = %s"
    result = execute_query(query, (purchase_id, user_id))
    return result is not None and result > 0