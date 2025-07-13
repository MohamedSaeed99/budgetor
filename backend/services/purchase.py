import database.repository.purchase_repository as repository
from models.purchase import Purchase, PurchaseEntity

def get_purchases(user_id: str, tab_id: str) -> list[PurchaseEntity]:
    purchases = [ entity.to_response() for entity in repository.get_purchases(user_id, tab_id) ]
    return sorted(purchases, key=lambda purchase: purchase.purchase_date)

def create_purchase(user_id: str, purchase: Purchase):
    repository.create_purchase(purchase.to_entity(user_id))

def update_purchase(user_id: str, purchase: Purchase):
    repository.update_purchase(purchase.to_entity(user_id))