import { Box } from "@mui/material";
import Drawer from "../Drawer/Drawer";
import Goals from "../GoalsForm/GoalsForm";
import Chat from "../Chat/Chat";

const Main = () => {
    return (
        <Box sx={{display:"flex", height: "100%", width: "100%"}}>
            <Drawer />
            
            <Box sx={{padding: "12px", display: "flex", width: "100%", gap: "12px"}}>
                <Box sx={{flex:"1"}}>
                    <Goals />
                </Box>
                <Chat />
            </Box>

            {/* This is the content layout should display after user answers/skips questions */}
            {/* <Box sx={{
                flex: '1 1 auto',
                display: "flex",
                flexDirection: "column",
            }}>
                <Box sx={{padding: "12px", display: "flex", flex: '1 1 auto', gap: "12px"}}>
                    <PurchaseInformation />
                    <Visualization />
                </Box>
                <Box sx={{
                    flex: '0 1 40px',
                    borderTop: "1px solid black"
                }}>
                    <Tabs />
                </Box> 
            </Box> */}
        </Box>
    )
}

export default Main;