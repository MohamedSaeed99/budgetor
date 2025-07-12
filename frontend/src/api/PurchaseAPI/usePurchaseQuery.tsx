import { useMutation, useQuery } from "@tanstack/react-query";
import { updatePurchase, deletePurchase, getPurchases, addPurchase } from "./PurchaseAPI";
import type { Purchase } from "../../components/PurchaseInformation/PurchaseInformation";
import { useUserLocation } from "../../context/UserLocation";

const PurchaseAPI = {
    GetPurchases: {
        useQuery: () => {
            const {section, tab} = useUserLocation();

            return useQuery({                
                queryKey: ['purchases', section, tab],
                queryFn: () => getPurchases(section ?? "", tab ?? ""),
                enabled: !!section && !!tab,
            })
        }
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
