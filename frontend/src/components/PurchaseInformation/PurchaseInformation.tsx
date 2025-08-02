import {
  Box,
  Paper,
} from '@mui/material'
import InputForm from './components/InputForm/InputForm'
import api from '../../api/api';
import { useUserLocation } from '../../context/UserLocation';

export interface Purchase {
    id?: string,
    tab_id: string;
    purchase_date: string | undefined;
    store: string;
    amount: number | undefined;
    category: string;
}

const PurchaseInformation = ({}) => {
    const {tab: currentTab} = useUserLocation();
    const {data: purchases, isLoading, isRefetching, refetch} = api.Purchase.GetPurchases.useQuery();
    const {mutate: addPurchase} = api.Purchase.AddPurchase.useMutation();
    const {mutate: updatePurchase} = api.Purchase.UpdatePurchase.useMutation();
    const {mutate: deletePurchase} = api.Purchase.DeletePurchase.useMutation();

    const handleAdd = (purchase: Purchase) => {
        addPurchase({...purchase, tab_id: currentTab} as Purchase, {
            onSuccess: () => refetch()
        })
    };

    const handleUpdate = (purchase: Purchase) => {
        updatePurchase({...purchase, tab_id: currentTab} as Purchase, {
            onSuccess: () => refetch()
        })
    };

    const handleDelete = (purchase: Purchase) => {
        if (purchase.id === undefined) return
        deletePurchase(purchase.id, {
            onSuccess: () => refetch()
        })
    };

    return (
        <Paper 
            variant='outlined'
            sx={{
                border: "1px solid red",
                width: "100%",
                height: "100%",
                overflowY: "auto"
            }}
        >
            {isLoading || isRefetching ?
                <Box>Loading</Box>
            :
            <Box sx={{
                maxHeight: "100%",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
            }}>
                {purchases?.map((purchase, index) => {
                    return <InputForm key={index}
                        availablePurchase={purchase} 
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                })}
                <InputForm handleAdd={handleAdd}/>
            </Box>
            }
        </Paper>
    )
}

export default PurchaseInformation