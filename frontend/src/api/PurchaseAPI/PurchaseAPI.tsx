import type { Purchase } from "../../components/PurchaseInformation/PurchaseInformation";
import api from "../axios.config"

export const getPurchases = async (section: string, tab: string): Promise<Purchase[]> => {
    const response = await api.get(`/purchase?section=${section}&tab=${tab}`);
    return response.data;
};

export const addPurchase = async (purchase: Purchase) => {
    const response = await api.post('/purchase', purchase);
    return response.data;
};

export const updatePurchase = async (purchase: Purchase) => {
    const response = await api.patch('/purchase', purchase);
    return response.data;
};

export const deletePurchase = async (purchaseId: string) => {
    const response = await api.delete(`/purchase/${purchaseId}`);
    return response.data;
};