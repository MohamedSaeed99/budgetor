import { Box, Button, styled, TextField, Typography } from "@mui/material";
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

type CategoriesFormProps = {
    budgetAmount: string
}

type BudgetPerCategory = {
    name: string,
    amount: number
}

const CategoriesForm = ({budgetAmount}: CategoriesFormProps) => {
    const [budgetPerCategory, setBudgetPerCategory] = useState<BudgetPerCategory[]>([]);
    
    const addBudgetPerCategory = () => {
        setBudgetPerCategory([...budgetPerCategory, { name: '', amount: 0 }]);
    }

    const updateBudgetAmount = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedBudgets = [...budgetPerCategory];
        const amount = event.target.value.replace(/[^0-9\.-]+/g, "");
        updatedBudgets[index].amount = parseFloat(amount) || 0;
        setBudgetPerCategory(updatedBudgets);
    }

    const updateCategory = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedBudgets = [...budgetPerCategory];
        updatedBudgets[index].name = event.target.value;
        setBudgetPerCategory(updatedBudgets);
    }

    const deleteBudgetPerCategory = (index: number) => {
        setBudgetPerCategory(budgetPerCategory.filter((_, i) => i !== index));
    }

    return (
        <Box sx={{ p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 'bold' }}>Break Down Your Budget</Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontSize: '11px' }}>
                        Add categories and allocate amounts to see how your budget is distributed
                    </Typography>
                    
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, minmax(200px, 1fr))', 
                        gap: 1, 
                        mb: 1 
                    }}>
                        {budgetPerCategory.map((category, index) => (
                            <Box key={index} sx={{ 
                                display: "flex", 
                                gap: 0.5, 
                                alignItems: "center",
                                p: 0.5,
                                border: '1px solid #e0e0e0',
                                borderRadius: 0.5,
                                backgroundColor: '#fafafa'
                            }}>
                                <InputField 
                                    placeholder="Category"
                                    value={category.name} 
                                    sx={{width: '80px', flex: 1}} 
                                    onChange={(e) => updateCategory(index, e)} 
                                />
                                <InputField 
                                    placeholder="Amount"
                                    value={category.amount || ''} 
                                    sx={{width: '60px'}} 
                                    onChange={(e) => updateBudgetAmount(index, e)}  
                                />
                                <DeleteIcon 
                                    onClick={() => deleteBudgetPerCategory(index)}
                                    sx={{ cursor: 'pointer', color: 'error.main', fontSize: '16px' }}
                                />
                            </Box>
                        ))}
                    </Box>
                    
                    <Button 
                        startIcon={<AddIcon />}
                        onClick={addBudgetPerCategory}
                        variant="outlined"
                        size="small"
                        sx={{ height: '28px' }}
                    >
                        Add Category
                    </Button>
                    
                    {/* Category-specific errors */}
                    {budgetPerCategory.length === 0 && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                            Please add at least one budget category
                        </Typography>
                    )}
                    
                    {budgetPerCategory.some(cat => !cat.name.trim() || cat.amount <= 0) && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                            All categories must have a name and positive amount
                        </Typography>
                    )}
                    
                    {(() => {
                        const totalCategoryBudget = budgetPerCategory.reduce((sum, cat) => sum + (cat.amount || 0), 0);
                        const totalBudget = parseFloat(budgetAmount) || 0;
                        if (totalCategoryBudget > totalBudget) {
                            return (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                                    Total category budgets cannot exceed the main budget amount
                                </Typography>
                            );
                        }
                        return null;
                    })()}
                </Box>
    )
}

export default CategoriesForm