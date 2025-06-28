import { useMutation, useQuery } from "@tanstack/react-query";
import { getItems, addItem } from "./ItemsAPI";

const ItemsAPI = {
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
                mutationFn: () => addItem(item),
            })
    }
}

export default ItemsAPI;
