import { Box, Typography, TextField, styled, Button, FormControl, Select, MenuItem } from "@mui/material"
import { useState, type ChangeEvent } from "react";
import CategoriesForm from "./components/CategoriesForm/CategoriesForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormDataProvider, useFormData } from "../../context/FormData";

const queryClient = new QueryClient()

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
    const {getBudgetAmount, updateBudgetAmount, deleteFormData, getCategories} = useFormData();
    const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriod>('monthly');

    const handleBudgetAmount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const amount = event.target.value.replace(/[^0-9\.-]+/g, "");
        updateBudgetAmount(parseFloat(amount));
    }

    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        
        if (!getBudgetAmount() || getBudgetAmount() <= 0) {
            newErrors.push("Please enter a valid budget amount");
        }
        
        if (getCategories().length === 0) {
            newErrors.push("Please add at least one budget category");
        }
        
        const totalCategoryBudget = getCategories().reduce((sum, cat) => sum + (cat.amount || 0), 0);
        const totalBudget = getBudgetAmount() || 0;
        
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
                totalAmount: getBudgetAmount(),
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
                            value={getBudgetAmount()} 
                            onChange={(e) => handleBudgetAmount(e)}
                            placeholder="0.00"
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>Period:</Typography>
                        <FormControl size="small" sx={{ minWidth: 80 }}>
                            <Select
                                value={budgetPeriod}
                                onChange={(e) => setBudgetPeriod(e.target.value as BudgetPeriod)}
                            >
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                                <MenuItem value="quarterly">Quarterly</MenuItem>
                                <MenuItem value="yearly">Yearly</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {(!getBudgetAmount() || getBudgetAmount() <= 0) && (
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

const Goals = () => {
    return <FormDataProvider><GoalsForm/></FormDataProvider>
}

export default Goals