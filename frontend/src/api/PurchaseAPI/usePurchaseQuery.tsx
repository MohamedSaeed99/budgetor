import { useMutation, useQuery } from "@tanstack/react-query";
import { updatePurchase, deletePurchase, getPurchases, addPurchase } from "./PurchaseAPI";
import type { Purchase } from "../../components/PurchaseInformation/PurchaseInformation";

const PurchaseAPI = {
    GetPurchases: {
        useQuery: () => 
            useQuery({
                queryKey: ['purchases'],
                queryFn: getPurchases,
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
                mutationFn: (purchaseId: string) => deletePurchase(purchaseId),
            })
    }
}

export default PurchaseAPI;
