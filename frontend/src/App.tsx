import PurchaseInformation from './components/PurchaseInformation/PurchaseInformation'
import { Box, Divider, Grid, Stack } from '@mui/material'
function App() {
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <PurchaseInformation/>
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Grid>
        <Stack spacing={2}>
          <Box>Analysis</Box>
          <Divider orientation="horizontal" />
          <Box>GPT Interaction</Box>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default App
