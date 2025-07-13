import {
  Box,
  Container,
  Paper
} from '@mui/material'
import InputForm from './components/InputForm/InputForm'
import api from '../../api/api';
import { useState } from 'react';

export interface Purchase {
  id?: string,
  tab_id: string;
  purchase_date: string | undefined;
  store: string;
  amount: number | undefined;
  category: string;
}

const PurchaseInformation = ({}) => {
  const {data, isLoading, refetch} = api.Purchase.GetPurchases.useQuery();
  const {mutate: addPurchase} = api.Purchase.AddPurchase.useMutation();
  const {mutate: updatePurchase} = api.Purchase.UpdatePurchase.useMutation();
  const {mutate: deletePurchase} = api.Purchase.DeletePurchase.useMutation();
  const [purchases, setPurchases] = useState(data)

  const handleAdd = (purchase: Purchase) => {
    addPurchase(purchase, {
      onSuccess: () => refetch()
    })
  };

  const handleUpdate = (purchase: Purchase) => {
    updatePurchase(purchase)
  };

  const handleDelete = (purchase: Purchase) => {
    deletePurchase(purchase.id!)
  };

  return (
    <Container sx={{ p: 2, ml: 0, px: 0, height: "100%" }}>
        <Paper 
          variant='outlined'
          sx={{
            paddingLeft: 2,
            paddingBottom: 1.5,
            paddingTop: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            overflowY: "auto",
          }}
        >
          {isLoading ?
            <Box>Loading</Box>
          :
            <>
              {purchases?.map((purchase, index) => {
                  return <InputForm key={index}
                      availablePurchase={purchase} 
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                  />}
              )}
              <InputForm handleAdd={handleAdd}/>
            </>
          }
        </Paper>
    </Container>
  )
}

export default PurchaseInformation