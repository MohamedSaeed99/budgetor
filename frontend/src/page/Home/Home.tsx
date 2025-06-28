import PurchaseInformation from '../../components/PurchaseInformation/PurchaseInformation'
import { Box, Divider, Grid, Stack, Button, AppBar, Toolbar, Typography } from '@mui/material'
import Visualization from '../../components/Visualization/Visualization'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{height: "100vh", width: "100vw"}}>
      <AppBar position="static" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#2c3e50', fontWeight: 700 }}>
            Budgetor
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            sx={{ 
              color: '#667eea',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.1)'
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Grid sx={{height: "calc(100% - 64px)", width: "100%"}} container spacing={2}>
        <Grid>
          <PurchaseInformation/>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid sx={{height: "100%"}} size="grow">
          <Stack>
            <Box sx={{height: "250px"}}>
              <Visualization />
            </Box>
            <Box>GPT Interaction</Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home 