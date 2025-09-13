import { Box, Typography, TextField, styled, Button, FormControl, Select, MenuItem } from "@mui/material"
import { useState, type ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
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

type BudgetPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

const GoalsForm = () => {
    const [budgetAmount, setBudgetAmount] = useState<string>("");
    const [budgetPeriod, setBudgetPeriod] = useState<BudgetPeriod>('monthly');
    const [budgetPerCategory, setBudgetPerCategory] = useState<BudgetPerCategory[]>([]);

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

    const addBudgetPerCategory = () => {
        setBudgetPerCategory([...budgetPerCategory, { name: '', amount: 0 }]);
    }

    const deleteBudgetPerCategory = (index: number) => {
        setBudgetPerCategory(budgetPerCategory.filter((_, i) => i !== index));
    }

    const handleBudgetAmount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const amount = event.target.value.replace(/[^0-9\.-]+/g, "");
        setBudgetAmount(convertToCurrencyAmount(parseFloat(amount) || 0));
    }

    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        
        if (!budgetAmount || parseFloat(budgetAmount) <= 0) {
            newErrors.push("Please enter a valid budget amount");
        }
        
        if (budgetPerCategory.length === 0) {
            newErrors.push("Please add at least one budget category");
        }
        
        const totalCategoryBudget = budgetPerCategory.reduce((sum, cat) => sum + (cat.amount || 0), 0);
        const totalBudget = parseFloat(budgetAmount) || 0;
        
        if (totalCategoryBudget > totalBudget) {
            newErrors.push("Total category budgets cannot exceed the main budget amount");
        }
        
        if (budgetPerCategory.some(cat => !cat.name.trim() || cat.amount <= 0)) {
            newErrors.push("All categories must have a name and positive amount");
        }
        
        return newErrors.length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const budgetData = {
                totalAmount: parseFloat(budgetAmount),
                period: budgetPeriod,
                categories: budgetPerCategory,
                createdAt: new Date().toISOString()
            };
            console.log("Budget plan submitted:", budgetData);
            // TODO: Send to API
        }
    }

    const getTotalCategoryBudget = () => {
        return budgetPerCategory.reduce((sum, cat) => sum + (cat.amount || 0), 0);
    }

    const getRemainingBudget = () => {
        const total = parseFloat(budgetAmount) || 0;
        const used = getTotalCategoryBudget();
        return total - used;
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
                            onChange={handleBudgetAmount}
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
                    {(!budgetAmount || parseFloat(budgetAmount) <= 0) && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                            Please enter a valid budget amount
                        </Typography>
                    )}
                </Box>

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

                {/* Budget Summary - Fun & Visual Layout */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    justifyContent: 'space-between',
                    p: 1, 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    color: 'white'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0.25, 
                        alignItems: 'center',
                        p: 0.5,
                        borderRadius: 1.5,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        minWidth: '80px'
                    }}>
                        <AccountBalanceWalletIcon sx={{ fontSize: '16px', color: '#FFD700' }} />
                        <Typography variant="caption" sx={{ opacity: 0.9, textAlign: 'center', fontSize: '10px' }}>Total Budget</Typography>
                        <Typography variant="body1" fontWeight="bold" sx={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                            ${parseFloat(budgetAmount) || 0}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0.25, 
                        alignItems: 'center',
                        p: 0.5,
                        borderRadius: 1.5,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        minWidth: '80px'
                    }}>
                        <TrendingUpIcon sx={{ fontSize: '16px', color: '#4CAF50' }} />
                        <Typography variant="caption" sx={{ opacity: 0.9, textAlign: 'center', fontSize: '10px' }}>Allocated</Typography>
                        <Typography variant="body1" fontWeight="bold" sx={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                            ${getTotalCategoryBudget()}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0.25, 
                        alignItems: 'center',
                        p: 0.5,
                        borderRadius: 1.5,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        minWidth: '80px'
                    }}>
                        <SavingsIcon sx={{ 
                            fontSize: '16px', 
                            color: getRemainingBudget() >= 0 ? '#4CAF50' : '#FF6B6B' 
                        }} />
                        <Typography variant="caption" sx={{ opacity: 0.9, textAlign: 'center', fontSize: '10px' }}>Remaining</Typography>
                        <Typography 
                            variant="body1" 
                            fontWeight="bold" 
                            sx={{ 
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                color: getRemainingBudget() >= 0 ? '#4CAF50' : '#FF6B6B'
                            }}
                        >
                            ${getRemainingBudget()}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Button 
                variant="contained" 
                type="submit"
                sx={{ alignSelf: "flex-end", mt: 1, height: '32px' }}
                disabled={budgetPerCategory.length === 0}
            >
                Create Budget Plan
            </Button>
        </form>
    )
}

export default GoalsForm;