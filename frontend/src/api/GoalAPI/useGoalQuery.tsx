import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserLocation } from "../../context/UserLocation";
import { addGoal, getGoal } from "./GoalAPI";
import type { Goal } from "../../models/Categories.model";

const GoalAPI = {
    GetGoals: {
        useQuery: () => {
            const {section} = useUserLocation();

            return useQuery({                
                queryKey: ['section_id', section],
                queryFn: () => getGoal(section ?? ""),
                enabled: !!section,
            })
        }
    },
    AddGoal: {
        useMutation: () =>
            useMutation({
                mutationFn: (goal: Goal) => addGoal(goal),
            })
    },
}

export default GoalAPI;

