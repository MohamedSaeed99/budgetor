import { Box } from "@mui/material";
import PurchaseInformation from "../PurchaseInformation/PurchaseInformation";
import Tabs from "../PurchaseInformation/components/Tab/Tab";
import Drawer from "../Drawer/Drawer";
import Visualization from "../Visualization/Visualization";


const Main = () => {
    return (
        <Box sx={{display:"flex", height: "100%", width: "100%"}}>
            <Drawer />
            <Box sx={{
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
            </Box>
        </Box>
    )
}

export default Main;