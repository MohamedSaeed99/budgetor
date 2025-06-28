import { useMutation, useQuery } from "@tanstack/react-query";
import { updatePurchase, deletePurchase, getPurchases, addPurchase } from "./PurchaseAPI";
import type { Purchase } from "../../components/PurchaseInformation/PurchaseInformation";

const ItemsAPI = {
    GetPurchases: {
        useQuery: () => 
            useQuery({
                queryKey: ['purchase'],
                queryFn: () => getPurchases(),
            })
    },
    AddPurchase: {
        useMutation: () =>
            useMutation({
                mutationFn: (purchase: Purchase) => addPurchase(purchase),
            })
    },
    UpdatePurchase: {
        useMutation: () =>
            useMutation({
                mutationFn: (purchase: Purchase) => updatePurchase(purchase),
            })
    },
    DeletePurchase: {
        useMutation: () =>
            useMutation({
                mutationFn: (purchase: Purchase) => deletePurchase(purchase),
            })
    }
}

export default ItemsAPI;
