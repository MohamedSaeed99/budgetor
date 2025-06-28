import type { Purchase } from "../../components/PurchaseInformation/PurchaseInformation";
import api from "../axios.config"

export const getPurchases = async () => {
    const response = await api.get('/item');
    return response.data();
};

export const addPurchase = async (purchase: Purchase) => {
    const response = await api.post('/item', purchase);
    return response.data();
};

export const updatePurchase = async (purchase: Purchase) => {
    const response = await api.patch('/item', purchase);
    return response.data();
};

export const deletePurchase = async (purchase: Purchase) => {
    const response = await api.delete('/item', purchase);
    return response.data();
};