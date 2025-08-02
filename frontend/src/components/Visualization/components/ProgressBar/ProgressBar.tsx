import { Box, Typography, LinearProgress } from "@mui/material"

type ProgressBarProps = {
    amount: number;
    budgetAmount: number;
    category: string
}

const ProgressBar = ({amount, budgetAmount, category}: ProgressBarProps) => {
    return (
        <Box sx={{
            border: '1px solid black',
            borderRadius: "5px",
            padding: "8px",
            width: "250px",
            maxHeight: "100px",
            display: "flex",
            gap: "8px",
            flexDirection: "column",
        }}>
            <Typography>{category}</Typography>
            <Box sx={{ width: '100%'}}>
                <LinearProgress sx={{
                    height: "10px", 
                    borderRadius: "5px",
                        "& .MuiLinearProgress-bar": {
                            borderRadius: "5px"
                        }
                    }} 
                    variant="determinate" 
                    value={(amount) / budgetAmount * 100}
                />

                <Box sx={{display: "flex", justifyContent: "space-between", mt: "4px"}}>
                    <Box sx={{textAlign: "start"}}>
                        <Typography>{`$${budgetAmount}`}</Typography>
                        <Typography>Limit</Typography>
                    </Box>
                    <Box sx={{textAlign: "end"}}>
                        <Typography>{`$${budgetAmount - amount}`}</Typography>
                        <Typography>Remaining</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ProgressBar;