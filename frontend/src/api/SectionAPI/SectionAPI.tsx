import type { Section } from "../../models/Section.model";
import api from "../axios.config"

export const getSections = async (): Promise<Section[]> => {
    const response = await api.get('/section');
    return response.data;
};

export const addSection = async (section: Section) => {
    const response = await api.post('/section', section);
    return response.data;
};

export const updateSection = async (section: Section) => {
    const response = await api.patch('/section', section);
    return response.data;
};

export const deleteSection = async (sectionId: string) => {
    const response = await api.delete(`/section/${sectionId}`);
    return response.data;
};