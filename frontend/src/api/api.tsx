import PurchaseAPI from "./PurchaseAPI/usePurchaseQuery"
import UserAPI from "./UserAPI/useUserQuery";

const api = {
    Purchase: PurchaseAPI,
    User: UserAPI
}

export default api;
