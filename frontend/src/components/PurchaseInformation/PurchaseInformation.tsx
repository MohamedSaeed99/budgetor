import { useState } from 'react'
import {
  Container,
  Paper
} from '@mui/material'
import InputForm from './components/InputForm/InputForm'

export interface Purchase {
  date: string | undefined;
  store: string;
  amount: number | undefined;
  category: string;
}

const PurchaseInformation = ({}) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const handleAdd = (purchase: Purchase) => {
    setPurchases([...purchases, purchase]);
  };

  const handleUpdate = (purchase: Purchase) => {
    console.log(`update purchase ${purchase}`);
  };

  const handleDelete = (purchase: Purchase) => {
    console.log(`delete purchase ${purchase}`)
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