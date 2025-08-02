import { Box } from "@mui/material"
import ProgressBar from "./components/ProgressBar/ProgressBar";
import SummaryBanner from "./components/SummaryBanner/SummaryBanner";

const Visualization = () => {
    
    const budgetAmount = 500
    const amount = 490.0
    return (<Box sx={{display: "flex", flexFlow: "column", gap: "8px", height: "100%", width: "100%"}}>
            <SummaryBanner budgetAmount={budgetAmount} amount={amount} />
            <ProgressBar amount={amount} budgetAmount={budgetAmount} category="Food"/>
        </Box>
    )
}

export default Visualization;