import PurchaseInformation from '../../components/PurchaseInformation/PurchaseInformation'
import { Box, Grid, Stack } from '@mui/material'
import Visualization from '../../components/Visualization/Visualization'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const Home = () => {

  return (
    <Box sx={{height: "100vh", width: "100vw"}}>
      <Header />
      <Grid sx={{height: "calc(100% - 77px)", width: "100%"}} container spacing={2}>
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
  )
}

export default Home 