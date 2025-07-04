import type { Section } from "../../models/Section.model";
import api from "../axios.config"

export const getSections = async (): Promise<Section> => {
    const response = await api.get('/tab');
    return response.data;
};

export const addSection = async (section: Section) => {
    const response = await api.post('/tab', section);
    return response.data;
};

export const updateSection = async (section: Section) => {
    const response = await api.patch('/tab', section);
    return response.data;
};

export const deleteSection = async (section: Section) => {
    const response = await api.delete('/tab', section);
    return response.data;
};