import database.repository.purchase_repository as purchase_repository
from models.purchase import Purchase, PurchaseEntity, toPurchaseEntity, toPurchase

def get_purchases(user_id: str) -> list[PurchaseEntity]:
    entities = purchase_repository.get_purchases(user_id)
    purchases = [ toPurchase(entity) for entity in entities ]
    return sorted(purchases, key=lambda purchase: purchase.purchase_date)

def create_purchase(user_id: str, purchase: Purchase):
    entity = toPurchaseEntity(user_id, purchase)
    purchase_repository.create_purchase(entity)

def update_purchase(user_id: str, purchase: Purchase):
    entity = toPurchaseEntity(user_id, purchase)
    purchase_repository.update_purchase(entity)