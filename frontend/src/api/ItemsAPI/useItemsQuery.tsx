import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getItems, addItem } from "./ItemsAPI";

const Items = {
    GetItems: {
        useQuery: () => 
            useQuery({
                queryKey: ['items'],
                queryFn: () => getItems(),
            })
    },
    AddItem: {
        useMutation: (item: string) =>
            useMutation({
                mutationFn: (item: string) => addItem(item),
            })
    }
}

export default Items;
