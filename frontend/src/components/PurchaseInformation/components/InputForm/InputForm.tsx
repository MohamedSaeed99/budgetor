import { Grid, Input, TextField } from "@mui/material";
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
    const [displayAmount, setDisplayAmount] = useState<string>("")
    const [isDateFieldFocus, setIsDateFieldFocus] = useState<boolean>(false);
    const [purchase, setPurchase] = useState<Purchase>(availablePurchase ?? {
        date: undefined,
        store: "",
        amount: undefined,
        category: ""
    } as Purchase);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPurchase({...purchase, date: event.target.value});
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPurchase({...purchase, category: event.target.value});
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.value.replace(/[^0-9\.-]+/g,"")
        setDisplayAmount(amount)
        setPurchase({...purchase, amount: amount ? parseFloat(amount) : undefined});
    }

    const convertToCurrencyAmount = () => {
        if (purchase.amount === undefined) setDisplayAmount('');
        else
            setDisplayAmount(new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(purchase.amount!));
    }

    const handleStoreChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPurchase({...purchase, store: event.target.value});
    }

    const handleClear = () => {
        setPurchase({
            date: undefined,
            store: "",
            amount: undefined,
            category: ""
        } as Purchase)
    }

    const dateExists = () => {
        return purchase.date !== undefined && purchase.date !== "";
    }

    return (
        <Grid container spacing={1} sx={{display: "flex", alignItems: "center"}}>
            <Grid>
                <InputField 
                    sx={{width: "100px"}} 
                    label="Date" 
                    name="date" 
                    type={dateExists() || isDateFieldFocus ? "date" : "text"} 
                    value={purchase.date} onChange={handleDateChange}
                    onFocus={() => setIsDateFieldFocus(true)}
                    onBlur={() => setIsDateFieldFocus(false)} />
                <InputField sx={{width: '150px'}} label="Store" name="store" value={purchase.store} onChange={handleStoreChange} />
                <InputField 
                    sx={{width: '75px'}} 
                    label="Amount" 
                    name="amount" 
                    type="string"
                    value={displayAmount} 
                    onChange={handleAmountChange}
                    onFocus={() => setDisplayAmount(purchase.amount?.toString() ?? "")}
                    onBlur={convertToCurrencyAmount}
                />
                <InputField sx={{width: '150px'}} label="Category" name="category" value={purchase.category} onChange={handleCategoryChange} />
            </Grid>
            <Grid display="flex" gap={2}>
                {handleAdd && <AddIcon sx={{
                    color: "rgba(0, 0, 0, 0.50)",
                    ":hover": {
                        color: "rgba(0, 0, 0, 0.80)",
                        cursor: "pointer"
                    }
                }} fontSize="small" onClick={() => handleAdd(purchase)}/>}
                {handleAdd && <ClearIcon sx={{
                    color: "rgba(0, 0, 0, 0.50)",
                    ":hover": {
                        color: "rgba(0, 0, 0, 0.80)",
                        cursor: "pointer"
                    }
                }} fontSize="small" onClick={() => handleClear()}/>}
                {handleUpdate && <CheckIcon sx={{
                    color: "rgba(0, 0, 0, 0.50)",
                    ":hover": {
                        color: "rgba(0, 0, 0, 0.80)",
                        cursor: "pointer"
                    }
                }} fontSize="small" onClick={() => handleUpdate(purchase)}/>}
                {handleDelete && <DeleteIcon sx={{
                    color: "rgba(0, 0, 0, 0.50)",
                    ":hover": {
                        color: "rgba(0, 0, 0, 0.80)",
                        cursor: "pointer"
                    }
                }} fontSize="small" onClick={() => handleDelete(purchase)}/>}
            </Grid>
        </Grid>
    )
}

export default InputForm;