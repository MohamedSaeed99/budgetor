import database.repository.purchase_repository as purchase_repository

def get_purchases(user_id: str):
    purchases = purchase_repository.get_purchases(user_id)

    print(purchases)
    return purchases