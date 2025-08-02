import { Box, Container, Paper, Modal, LinearProgress, Typography } from "@mui/material"
import SpendingPie from "./components/SpendingPie/SpendingPie";
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import HorizontalBar from "./components/HorizontalBar/HorizontalBar";
import { useState } from "react";
import VisualModal from "./components/VisualModal/VisualModal";
import ProgressBar from "./components/ProgressBar/ProgressBar";

const visuals = {
    "pie": <SpendingPie />,
    "bar": <HorizontalBar />,
    "sankey": <div />
}

const Visualization = () => {
    
    const budgetAmount = 500
    const amount = 490.0
    return (<>
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
                <Typography>$3500</Typography>
                <Typography>Total Budget</Typography>
            </Box>
            <Box sx={{display: "flex", gap: "24px"}}>
                <Box sx={{width: "250px"}}>
                    <Typography>2150</Typography>
                    <Typography>Spent</Typography>
                </Box>
                <Box sx={{width: "250px"}}>
                    <Typography>$1350</Typography>
                    <Typography>Remaining</Typography>
                </Box>
            </Box>
        </Box>
        <ProgressBar amount={amount} budgetAmount={budgetAmount} category="Food"/>
        </>
    )
}

export default Visualization;