import type { Purchase } from "../../components/PurchaseInformation/PurchaseInformation";
import { useUserLocation } from "../../context/UserLocation";
import api from "../axios.config"

export const getPurchases = async (tab: string): Promise<Purchase[]> => {
    const response = await api.get(`/purchase/${tab}`);
    return response.data;
};

export const addPurchase = async (purchase: Purchase) => {
    console.log("here", purchase)
    const response = await api.post('/purchase', purchase);
    return response.data;
};

export const updatePurchase = async (purchase: Purchase) => {
    const {tab} = useUserLocation();

    const response = await api.patch('/purchase', {...purchase, tab_id: tab});
    return response.data;
};

export const deletePurchase = async (purchaseId: string) => {
    const response = await api.delete(`/purchase/${purchaseId}`);
    return response.data;
};