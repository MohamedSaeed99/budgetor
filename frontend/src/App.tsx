import PurchaseInformation from './components/PurchaseInformation/PurchaseInformation'
import { Box, Divider, Grid, Stack } from '@mui/material'
import Visualization from './components/Visualization/Visualization'
import { useState } from 'react'
import Login from './page/Login/Login'

const App = () => {
  const isLoggedIn = false

  return (<Box sx={{height: "100vh", width: "100vw"}}>{ isLoggedIn ?
      <Grid sx={{height: "100%", width: "100%"}} container spacing={2}>
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
      :
      <Login />
    }</Box>
  )
}

export default App
