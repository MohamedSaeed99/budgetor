import { useState } from 'react'
import {
  Container,
  Paper
} from '@mui/material'
import InputForm from './components/InputForm/InputForm'
import api from '../../api/api';

export interface Purchase {
  date: string | undefined;
  store: string;
  amount: number | undefined;
  category: string;
}

const PurchaseInformation = ({}) => {
  const {data} = api.Purchase.GetPurchases.useQuery()
  const {mutate: addPurchase} = api.Purchase.AddPurchase.useMutation()
  const {mutate: updatePurchase} = api.Purchase.UpdatePurchase.useMutation();
  const {mutate: deletePurchase} = api.Purchase.DeletePurchase.useMutation();

  const [purchases, setPurchases] = useState<Purchase[]>([data]);

  const handleAdd = (purchase: Purchase) => {
    addPurchase(purchase, {
      onSuccess: () => setPurchases([...purchases, purchase])
    })
  };

  const handleUpdate = (purchase: Purchase) => {
    updatePurchase(purchase, {
      onSuccess: () => setPurchases([...purchases, purchase])
    })
  };

  const handleDelete = (purchase: Purchase) => {
    deletePurchase(purchase, {
      onSuccess: () => setPurchases([...purchases, purchase])
    })
  };

  return (
    <Container sx={{ p: 2, ml: 0, px: 0 }}>
        <Paper 
        variant='outlined'
          sx={{padding:2,
            display: "flex",
            flexDirection: "column",
            gap: 1
          }}
        >
            {purchases.map((purchase, index) => 
                <InputForm key={index}
                    availablePurchase={purchase} 
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            )}
            <InputForm handleAdd={handleAdd}/>
        </Paper>
    </Container>
  )
}

export default PurchaseInformation