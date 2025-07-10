import { Button, Toolbar, Typography } from "@mui/material"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
  
    const handleLogout = () => {
      logout()
      navigate('/login')
    }
    
    return (
        <Toolbar sx={{
            minHeight: "unset !important",
            height: "100%",
            display: "flex", 
            justifyContent: "space-between", 
            alignContent:"center", 
            borderBottom: "1px solid black",  
        }}>
            <Typography>Budgetor</Typography>
            <Button onClick={handleLogout}>Logout</Button>
        </Toolbar>
    )
}

export default Header;