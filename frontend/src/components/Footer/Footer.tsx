import { Container } from "@mui/material";
import Tabs from "./components/Tab/Tab";

const Footer = () => {
    return (
        <Container sx={{height:"100%", width: "100%", display: "flex", justifyContent: "flex-start", alignContent: "center", gap: 1, backgroundColor: "white"}}>
            <Tabs />
        </Container>
    )
}

export default Footer;