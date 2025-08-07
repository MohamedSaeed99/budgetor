import { Box, Typography, TextField, styled, Button } from "@mui/material"
import { useState, type ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { convertToCurrencyAmount } from "../../utils/currency.utils";

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

type BudgetPerCategory = {
    name: string,
    amount: number
}
const GoalsForm = () => {
    const [budgetAmount, setBudgetAmount] = useState<string>("");
    const [reason, setReason] = useState("");
    const [budgetPerCategory, setBudgetPerCategory] = useState<BudgetPerCategory[]>([])

    const updateBudgetAmount = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedBudgets = [...budgetPerCategory]
        updatedBudgets[index].amount = Number(event.target.value)
        setBudgetPerCategory(updatedBudgets)
    }

    const updateCatgory = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedBudgets = [...budgetPerCategory]
        updatedBudgets[index].name = event.target.value
        setBudgetPerCategory(updatedBudgets)
    }

    const addBudgetPerCategory = () => {
        setBudgetPerCategory([...budgetPerCategory, {} as BudgetPerCategory])
    }

    // TODO: fix splicing issues
    const deleteBudgetPerCategory = (index: number) => {
        const updatedBudgets = [...budgetPerCategory]
        updatedBudgets.splice(index, 1);
        setBudgetPerCategory(updatedBudgets)
    }

    const handleUpdateReason = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReason(event.target.value)
    }

    const handleBudgetAmount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const amount = event.target.value.replace(/[^0-9\.-]+/g,"")
        setBudgetAmount(convertToCurrencyAmount(parseFloat(amount)))
    }

    const handleSubmit = () => {
        console.log("submitted")
    }

    return (
        <form style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}} onSubmit={handleSubmit}>
            <Box>
                <Box sx={{display: "flex", gap: "4px"}}>
                    <Typography>What is the budget for this section?</Typography>
                    <InputField sx={{width: '75px'}} value={budgetAmount} onChange={handleBudgetAmount} />
                </Box>

                <Box>
                    <Typography>What are you budgeting for</Typography>
                    <InputField value={reason} onChange={handleUpdateReason} />
                </Box>

                <Box>
                    <Typography>Category with budgeted amount</Typography>
                    {budgetPerCategory.map((value, index) => {

                        return (
                            <Box key={index}>
                                <InputField value={value.name} sx={{width: '150px'}} onChange={(e) => updateCatgory(index, e)} />
                                <InputField value={value.amount} sx={{width: '75px'}} onChange={(e) => updateBudgetAmount(index, e)}  />
                                <DeleteIcon onClick={() => deleteBudgetPerCategory(index)} />
                            </Box>
                        )
                    })}
                    <AddIcon onClick={addBudgetPerCategory}/>
                </Box>
            </Box>

            <Button sx={{alignSelf: "flex-end"}} type="submit">
                Submit
            </Button>
        </form>
    )
}

export default GoalsForm;