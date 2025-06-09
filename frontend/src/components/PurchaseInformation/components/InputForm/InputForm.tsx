import { Grid, TextField } from "@mui/material";
import type { Purchase } from "../../PurchaseInformation";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

type InputFormProps = {
    availablePurchase?: Purchase;
    handleAdd?: (purchase: Purchase) => void;
    handleUpdate?: (purchase: Purchase) => void;
    handleDelete?: (purchase: Purchase) => void;
}

const InputField = styled(TextField)({
    margin: 2,
    height: '20px',
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
        transform: "translate(8px, 2px) scale(1)"
    },
    "& .MuiInputLabel-root": {
        fontSize: '12px',
    },
    "& .MuiInputBase-root": {
        padding: '0px 4px',
        fontSize: "12px",
        height: "100%"
    },
    "& .MuiInputBase-input": {
        padding: 0,
    }
})

const InputForm = ({ availablePurchase, handleAdd, handleDelete, handleUpdate }: InputFormProps) => {
    const [purchase, setPurchase] = useState<Purchase>(availablePurchase ?? {
        date: undefined,
        store: "",
        amount: 0,
        category: ""
    } as Purchase);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPurchase({...purchase, date: event.target.value as unknown as Date});
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPurchase({...purchase, category: event.target.value});
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPurchase({...purchase, amount: event.target.value as unknown as number});
    }

    const handleStoreChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPurchase({...purchase, store: event.target.value});
    }

    const handleClear = () => {
        setPurchase({
            date: undefined,
            store: "",
            amount: 0,
            category: ""
        } as Purchase)
    }

    return (
        <Grid container spacing={1} sx={{display: "flex", alignItems: "center"}}>
            <Grid>
                <InputField sx={{width: '75px'}} label="Date" name="date" value={purchase.date} onChange={handleDateChange} />
                <InputField sx={{width: '150px'}} label="Store" name="store" value={purchase.store} onChange={handleStoreChange} />
                <InputField sx={{width: '75px'}} label="Amount" name="amount" value={purchase.amount} onChange={handleAmountChange} />
                <InputField sx={{width: '150px'}} label="Category" name="category" value={purchase.category} onChange={handleCategoryChange} />
            </Grid>
            <Grid>
                {handleAdd && <AddIcon fontSize="small" onClick={() => handleAdd(purchase)}/>}
                {handleAdd && <ClearIcon fontSize="small" onClick={() => handleClear()}/>}
                {handleUpdate && <CheckIcon fontSize="small" onClick={() => handleUpdate(purchase)}/>}
                {handleDelete && <DeleteIcon fontSize="small" onClick={() => handleDelete(purchase)}/>}
            </Grid>
        </Grid>
    )
}

export default InputForm;