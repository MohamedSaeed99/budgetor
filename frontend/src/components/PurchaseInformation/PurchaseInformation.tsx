import { useState } from 'react'
import {
  Container,
  Paper
} from '@mui/material'
import InputForm from './components/InputForm/InputForm'

export interface Purchase {
  date: Date | undefined;
  store: string;
  amount: number;
  category: string;
}

const PurchaseInformation = ({}) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [newPurchase, setNewPurchase] = useState<Purchase>({
    date: undefined,
    store: '',
    amount: 0,
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchases([...purchases, newPurchase]);
    setNewPurchase({
      date: undefined,
      store: '',
      amount: 0,
      category: ''
    });
  };

  return (
    <Container sx={{ p: 2, ml: 0, px: 0 }}>
        <Paper 
          component="form" 
          onSubmit={handleSubmit}
          sx={{padding: 2}}
        >
            <InputForm handleAction={function (purchase: Purchase): void {
                  throw new Error('Function not implemented.');
              } } />
        </Paper>
    </Container>
  )
}

export default PurchaseInformation