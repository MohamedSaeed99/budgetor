import ItemsAPI from "./ItemsAPI/useItemsQuery"
import UserAPI from "./UserAPI/useUserQuery";

const api = {
    Items: ItemsAPI,
    User: UserAPI
}

export default api;
