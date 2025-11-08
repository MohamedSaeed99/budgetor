import database.repository.purchase_repository as repository
from models.purchase import Purchase

def get_purchases(tab_id: str) -> list[Purchase]:
    purchases = [entity for entity in repository.get_purchases(tab_id)]
    return sorted(purchases, key=lambda purchase: purchase.purchase_date)

def create_purchase(purchase: Purchase):
    repository.create_purchase(purchase)

def update_purchase(purchase: Purchase):
    repository.update_purchase(purchase)

def delete_purchase(purchase_id: str):
    repository.delete_purchase(purchase_id)