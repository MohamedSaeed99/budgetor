import { Box, Container, Paper, Modal } from "@mui/material"
import SpendingPie from "./components/SpendingPie/SpendingPie";
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import HorizontalBar from "./components/HorizontalBar/HorizontalBar";
import { useState } from "react";
import VisualModal from "./components/VisualModal/VisualModal";

const visuals = {
    "pie": <SpendingPie />,
    "bar": <HorizontalBar />,
    "sankey": <div />
}

const Visualization = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container sx={{height:"100%", width:"100%", p: 2, ml: 0, px: 0 }}>
            <Paper 
                variant="outlined"   
                sx={{position: "relative", height:"100%", width:"100%"}}
            >
                <Box sx={{zIndex:1000, position: "absolute", top: 10, right: 10}}>
                    <AspectRatioRoundedIcon onClick={handleOpen} sx={{
                        color: "rgba(0, 0, 0, 0.50)",
                        ":hover": {
                            color: "rgba(0, 0, 0, 0.80)",
                            cursor: "pointer"
                        }
                    }}/>
                </Box>
                <Box sx={{height:"100%", width:"100%", display: "flex", justifyContent: "center", alignContent: "center"}}>
                    {visuals["bar"]}
                </Box>
            </Paper>
            <VisualModal open={open} handleClose={handleClose} />
        </Container>
      )
}

export default Visualization;