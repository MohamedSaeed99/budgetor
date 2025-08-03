import { Box, Typography, TextField, styled } from "@mui/material"
import { useState, type ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const [budgetAmount, setBudgetAmount] = useState();
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

    const deleteBudgetPerCategory = (index: number) => {
        const updatedBudgets = [...budgetPerCategory]
        console.log(index, updatedBudgets[index])
        updatedBudgets.splice(index, 1);
        console.log(updatedBudgets)
        setBudgetPerCategory([...updatedBudgets])
    }

    return (
        <Box>
            <Box sx={{display: "flex", gap: "4px"}}>
                <Typography>What is the budget for this section?</Typography>
                <InputField sx={{width: '75px'}} />
            </Box>

            <Box>
                <Typography>What are you budgeting for</Typography>
                <InputField />
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
    )
}

export default GoalsForm;