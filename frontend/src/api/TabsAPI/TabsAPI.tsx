import type { Tab } from "../../models/Tab.model";
import api from "../axios.config"

export const getTabs = async (): Promise<Tab[]> => {
    const response = await api.get('/tab');
    return response.data;
};

export const addTab = async (tab: Tab) => {
    const response = await api.post('/tab', tab);
    return response.data;
};

export const updateTab = async (tab: Tab) => {
    const response = await api.patch('/tab', tab);
    return response.data;
};

export const deleteTab = async (tabId: string) => {
    const response = await api.delete(`/tab/${tabId}`);
    return response.data;
};