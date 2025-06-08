import { Box, Button, TextField } from "@mui/material";
import type { Purchase } from "../../PurchaseInformation";
import { useState } from "react";
import { styled } from "@mui/material/styles";


type InputFormProps = {
    availablePurchase?: Purchase;
    handleAction: (purchase: Purchase) => void;
}


const InputField = styled(TextField)({
    margin: 4,
    "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
        transform: "translate(14px, 8px) scale(1)"
    },
    "& .MuiInputLabel-root": {
        color: "green",
        alignSelf: 'center',
        justifySelf: 'center'
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "purple"
    },
    "& .MuiInputBase-root": {
        color: "red",
    },
    "& .MuiInputBase-input": {
        padding: 8,
    }
})

const InputForm = ({ availablePurchase, handleAction }: InputFormProps) => {
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

    const handleSubmitAction = () => {
        handleAction(purchase);
    }

    return (
        <Box sx={{display: "flex"}}>
            <InputField label="Date" name="date" value={purchase.date} onChange={handleDateChange} />
            <InputField label="Store" name="store" value={purchase.store} onChange={handleStoreChange} />
            <InputField label="Amount" name="amount" value={purchase.amount} onChange={handleAmountChange} />
            <InputField label="Category" name="category" value={purchase.category} onChange={handleCategoryChange} />
            <Button onClick={handleSubmitAction}>test</Button>
        </Box>
    )
}

export default InputForm;