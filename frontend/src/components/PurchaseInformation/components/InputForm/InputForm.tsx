import { Box, TextField } from "@mui/material";
import type { Purchase } from "../../PurchaseInformation";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useUserLocation } from "../../../../context/UserLocation";

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

const convertToCurrencyAmount = (amount: number | undefined) => {
    if (amount === undefined) return '';
    else
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
}

const InputForm = ({ availablePurchase, handleAdd, handleDelete, handleUpdate }: InputFormProps) => {
    console.log(availablePurchase)
    const {tab} = useUserLocation();
    const [displayAmount, setDisplayAmount] = useState<string>(convertToCurrencyAmount(availablePurchase?.amount))
    const [purchase, setPurchase] = useState<Purchase>(availablePurchase ?? {
        purchase_date: undefined,
        store: "",
        amount: undefined,
        category: "",
        tab_id: tab ?? ""
    });

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPurchase({...purchase, purchase_date: event.target.value});
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPurchase({...purchase, category: event.target.value});
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.value.replace(/[^0-9\.-]+/g,"")
        setDisplayAmount(amount)
        setPurchase({...purchase, amount: amount ? parseFloat(amount) : undefined});
    }

    const handleStoreChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPurchase({...purchase, store: event.target.value});
    }

    const handleClear = () => {
        setDisplayAmount("")
        setPurchase({
            purchase_date: undefined,
            store: "",
            amount: undefined,
            category: "",
            tab_id: tab ?? ""
        })
    }

    return (
        <Box sx={{display: "flex", width: "100%", gap: "4px"}}>
            <Box sx={{display: "flex", gap: "4px", alignItems: "center"}}>
                <InputField 
                    sx={{width: "100px"}}
                    name="date" 
                    type={"date"} 
                    value={purchase.purchase_date} 
                    onChange={handleDateChange} />
                <InputField sx={{width: '150px'}} placeholder="Store" name="store" value={purchase.store} onChange={handleStoreChange} />
                <InputField 
                    sx={{width: '75px'}} 
                    placeholder="Amount" 
                    name="amount" 
                    type="string"
                    value={displayAmount} 
                    onChange={handleAmountChange}
                    onFocus={() => setDisplayAmount(purchase.amount?.toString() ?? "")}
                    onBlur={() => setDisplayAmount(convertToCurrencyAmount(purchase.amount))}
                />
                <InputField sx={{width: '150px'}} placeholder="Category" name="category" value={purchase.category} onChange={handleCategoryChange} />
            </Box>

            <Box sx={{display: "flex", gap: "4px", alignItems: "center"}}>
                {handleAdd && <AddIcon sx={{
                    color: "rgba(0, 0, 0, 0.50)",
                    ":hover": {
                        color: "rgba(0, 0, 0, 0.80)",
                        cursor: "pointer"
                    }
                }} fontSize="small" onClick={() => {handleAdd(purchase); handleClear();}}/>}
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
            </Box>
        </Box>
    )
}

export default InputForm;