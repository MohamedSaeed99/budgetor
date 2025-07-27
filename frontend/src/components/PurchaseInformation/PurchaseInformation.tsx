import {
  Box,
  Paper,
} from '@mui/material'
import InputForm from './components/InputForm/InputForm'
import api from '../../api/api';

export interface Purchase {
    id?: string,
    tab_id: string;
    purchase_date: string | undefined;
    store: string;
    amount: number | undefined;
    category: string;
}

const PurchaseInformation = ({}) => {
    const {data: purchases, isLoading, isRefetching, refetch} = api.Purchase.GetPurchases.useQuery();
    const {mutate: addPurchase} = api.Purchase.AddPurchase.useMutation();
    const {mutate: updatePurchase} = api.Purchase.UpdatePurchase.useMutation();
    const {mutate: deletePurchase} = api.Purchase.DeletePurchase.useMutation();

    const handleAdd = (purchase: Purchase) => {
        addPurchase(purchase, {
            onSuccess: () => refetch()
        })
    };

    const handleUpdate = (purchase: Purchase) => {
        updatePurchase(purchase, {
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
                height: "100%",
            }}
        >
            {isLoading || isRefetching ?
                <Box>Loading</Box>
            :
            <Box sx={{
                padding: "12px",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                overflowY: "auto",
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