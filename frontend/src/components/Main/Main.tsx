import { Box } from "@mui/material";
import PurchaseInformation from "../PurchaseInformation/PurchaseInformation";
import Tabs from "../PurchaseInformation/components/Tab/Tab";
import Drawer from "../Drawer/Drawer";


const Main = () => {
    return (
        <Box sx={{display: "flex", height: "100%", width: "100%"}}>
            <Drawer />
            <Box sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
            <Box sx={{m: 2, height: "calc(100% - 40px)", overflow: "hidden"}}>
                <PurchaseInformation/>
            </Box>
            <Box sx={{
                mt: "12px",
                background: "white",
                height: "40px",
                width: "100%",
                borderTop: "1px solid black"
                }}
            >
                <Tabs />
            </Box> 
        </Box>
    </Box>
    )
}

export default Main;