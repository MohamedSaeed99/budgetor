import { Box, Typography } from "@mui/material"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import type { Category } from "../../../../models/Categories.model";

type FormSummaryProps = {
    categories: Category[],
    budgetAmount: number
}

const FormSummary = ({budgetAmount, categories}: FormSummaryProps) => {
    const getTotalCategoryBudget = () => {
        return categories.reduce((sum: number, cat: Category) => sum + (cat.amount || 0), 0);
    }
    
    const getRemainingBudget = () => {
        const total = budgetAmount || 0;
        const used = getTotalCategoryBudget();
        return total - used;
    }

    return (
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
                            ${budgetAmount || 0}
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
    )
}

export default FormSummary