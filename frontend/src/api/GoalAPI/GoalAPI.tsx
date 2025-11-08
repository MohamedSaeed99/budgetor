import type { Goal } from "../../models/Categories.model";
import api from "../axios.config"

export const getGoal = async (section: string): Promise<Goal> => {
    const response = await api.get(`/goal/${section}`);
    return response.data;
};

export const addGoal = async (goal: Goal) => {
    const response = await api.post('/goal', goal);
    return response.data;
};