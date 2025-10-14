import { Box, Typography, TextField, styled, Button, FormControl, Select, MenuItem } from "@mui/material"
import { useState, type ChangeEvent } from "react";
import CategoriesForm from "./components/CategoriesForm/CategoriesForm";
import { useFormData } from "../../context/FormData";

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

type BudgetPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

const GoalsForm = () => {
    const {getBudgetAmount, updateBudgetAmount, deleteFormData, getCategories, getBudgetPeriod, updateBudgetPeriod} = useFormData();
    const [budgetPeriod, setBudgetPeriod] = useState<string>(getBudgetPeriod);
    const [budgetAmount, setBudgetAmount] = useState(getBudgetAmount);

    const handleBudgetAmount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const amount = event.target.value.replace(/[^0-9\.-]+/g, "");
        setBudgetAmount(parseFloat(amount));
    }

    const handleOnBlur = () => {
        updateBudgetAmount(budgetAmount)
    }

    const handleBudgetPeriod = (event: { target: { value: string; }; }) => {
        const period = event.target.value as BudgetPeriod
        setBudgetPeriod(period)
        updateBudgetPeriod(period)
    }

    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        
        if (!budgetAmount || budgetAmount <= 0) {
            newErrors.push("Please enter a valid budget amount");
        }
        
        if (getCategories().length === 0) {
            newErrors.push("Please add at least one budget category");
        }
        
        const totalCategoryBudget = getCategories().reduce((sum, cat) => sum + (cat.amount || 0), 0);
        const totalBudget = budgetAmount || 0;
        
        if (totalCategoryBudget > totalBudget) {
            newErrors.push("Total category budgets cannot exceed the main budget amount");
        }
        
        if (getCategories().some(cat => !cat.name.trim() || cat.amount <= 0)) {
            newErrors.push("All categories must have a name and positive amount");
        }
        
        return newErrors.length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const budgetData = {
                totalAmount: budgetAmount,
                period: budgetPeriod,
                categories: getCategories(),
                createdAt: new Date().toISOString()
            };
            console.log("Budget plan submitted:", budgetData);
            deleteFormData()
            // TODO: Send to API
        }
    }

    return (
        <form style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}} onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa' }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 'bold' }}>Set Your Budget</Typography>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Typography variant="body2">Budget Amount:</Typography>
                        <InputField 
                            sx={{width: '120px'}} 
                            value={budgetAmount} 
                            onBlur={handleOnBlur}
                            onChange={(e) => handleBudgetAmount(e)}
                            placeholder="0.00"
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>Period:</Typography>
                        <FormControl size="small" sx={{ minWidth: 80 }}>
                            <Select
                                value={budgetPeriod}
                                onChange={handleBudgetPeriod}
                                sx={{height: "25px"}}
                            >
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                                <MenuItem value="quarterly">Quarterly</MenuItem>
                                <MenuItem value="yearly">Yearly</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {(!budgetAmount || budgetAmount <= 0) && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                            Please enter a valid budget amount
                        </Typography>
                    )}
                </Box>

                <CategoriesForm />
            </Box>
            <Button 
                variant="contained" 
                type="submit"
                sx={{ alignSelf: "flex-end", mt: 1, height: '32px' }}
                disabled={getCategories().length === 0}
            >
                Create Budget Plan
            </Button>
        </form>
    )
}

export default GoalsForm