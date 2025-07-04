import { Container } from "@mui/material";
import Tab from "./components/Tab/Tab";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import api from "../../api/api";

const Footer = () => {
    const {data: tabs} = api.Tabs.GetTabs.useQuery()


    return (
        <Container sx={{display: "flex", justifyContent: "flex-start", alignContent: "center", gap: 1}}>
            <Tab />
            <AddRoundedIcon />
        </Container>
    )
}

export default Footer;