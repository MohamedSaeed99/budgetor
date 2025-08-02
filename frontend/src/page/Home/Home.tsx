import { Box } from '@mui/material'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'

const Home = () => {
  return (
    <Box sx={{overflow: "hidden", height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
      <Box sx={{
        height: "40px",
        width: "100%",
      }}>
        <Header />
      </Box>
      <Box sx={{ flex: '1 1 auto'}}>
        <Main />
      </Box>
    </Box>
  )
}

export default Home 