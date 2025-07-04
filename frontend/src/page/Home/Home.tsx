import PurchaseInformation from '../../components/PurchaseInformation/PurchaseInformation'
import { Box, Grid, Stack } from '@mui/material'
import Visualization from '../../components/Visualization/Visualization'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Drawer from '../../components/Drawer/Drawer'

const Home = () => {
  return (
    <Box sx={{height: "100vh", width: "100vw", display: "flex", flexDirection: "column"}}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Drawer />
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          width: '100%'
        }}>
          <Grid sx={{height: "calc(100% - 37px)", width: "100%"}} container spacing={2}>
            <Grid>
              <PurchaseInformation/>
            </Grid>
            <Grid sx={{height: "100%"}} size="grow">
              <Stack>
                <Box sx={{height: "200px"}}>
                  <Visualization />
                </Box>
                <Box>GPT Interaction</Box>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{
            height: "35px",
            borderTop: "1px solid black"
          }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home 