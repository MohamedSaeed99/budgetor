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
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-between",
                gap: "8px",
                height: "100%",
                width: "100%"
            }}>
                <Box sx={{height: "calc(100% - 40px)", flex: '1 1 auto'}}>
                    <Visualization />
                </Box>
                <Box sx={{
                    height: '40px',
                    background: "white",
                    borderTop: "1px solid black"
                }}>
                    <Tabs />
                </Box> 
        </Box>
    </Box>
    )
}

export default Main;