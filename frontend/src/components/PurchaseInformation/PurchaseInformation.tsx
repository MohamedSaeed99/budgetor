import { useState } from 'react'
import {
  Box,
  Container,
  Paper
} from '@mui/material'
import InputForm from './components/InputForm/InputForm'
import api from '../../api/api';

export interface Purchase {
  tab_id: string;
  purchase_date: string | undefined;
  store: string;
  amount: number | undefined;
  category: string;
}

const PurchaseInformation = ({}) => {
  const {data: purchases, isLoading, refetch} = api.Purchase.GetPurchases.useQuery()
  const {mutate: addPurchase} = api.Purchase.AddPurchase.useMutation()
  const {mutate: updatePurchase} = api.Purchase.UpdatePurchase.useMutation();
  const {mutate: deletePurchase} = api.Purchase.DeletePurchase.useMutation();

  const handleAdd = (purchase: Purchase) => {
    addPurchase({...purchase, tab_id: "aaaabbbb-aaaa-bbbb-aaaa-bbbbccccdddd"}, {
      onSuccess: () => refetch()
    })
  };

  const handleUpdate = (purchase: Purchase) => {
    updatePurchase(purchase)
  };

  const handleDelete = (purchase: Purchase) => {
    deletePurchase(purchase)
  };

  return (
    <Container sx={{ p: 2, ml: 0, px: 0 }}>
        <Paper 
          variant='outlined'
          sx={{
            padding:2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1
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