import PurchaseInformation from './components/PurchaseInformation/PurchaseInformation'
import { Box, Divider, Grid, Stack } from '@mui/material'
import Visualization from './components/Visualization/Visualization'
function App() {
  return (
    <Grid sx={{height: "100vh", width: "100vw"}} container spacing={2}>
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
  )
}

export default App
