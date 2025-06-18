import { Box, Button, Divider, Grid, Modal, Paper } from "@mui/material";
import HorizontalBar from "../HorizontalBar/HorizontalBar";
import SpendingPie from "../SpendingPie/SpendingPie";
import Sankey from "../Sankey/Sankey";

type VisualModalProps = {
    open: boolean;
    handleClose: () => void;
}

const VisualModal = ({open, handleClose}: VisualModalProps) => {
    return (
        <Modal
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            open={open}
            onClose={handleClose}
            aria-labelledby="visualization-modal"
            aria-describedby="visualization-modal-description"
        >
            <Grid container spacing={3} sx={{
                width: "80%",
                height: "80%",
                background: "white"
            }}>
                <Grid size={3.7} sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <HorizontalBar />
                    <Button sx={{justifySelf: "flex-end"}}>Select</Button>
                </Grid>
                <Divider  orientation="vertical" />
                <Grid size={3.7} sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <SpendingPie />
                    <Button sx={{justifySelf: "flex-end"}}>Select</Button>
                </Grid>
                <Divider orientation="vertical" />
                <Grid size={3.7}  sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <Sankey />
                    <Button sx={{justifySelf: "flex-end"}}>Select</Button>
                </Grid>
            </Grid>
        </Modal>
    )

}

export default VisualModal;