import { Box, Typography } from "@mui/material"


type SummaryBannerProps = {
    budgetAmount: number
    amount: number
}

const SummaryBanner = ({budgetAmount, amount}: SummaryBannerProps) => {
    return (
        <Box sx={{
            border: '1px solid black',
            borderRadius: "5px",
            padding: "8px",
            maxHeight: "100px",
            display: "flex",
            gap: "8px",
            flexDirection: "column",
        }}>
            <Box>
                <Typography>{budgetAmount}</Typography>
                <Typography>Total Budget</Typography>
            </Box>
            <Box sx={{display: "flex", gap: "24px"}}>
                <Box sx={{width: "250px"}}>
                    <Typography>{amount}</Typography>
                    <Typography>Spent</Typography>
                </Box>
                <Box sx={{width: "250px"}}>
                    <Typography>{budgetAmount - amount}</Typography>
                    <Typography>Remaining</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default SummaryBanner;