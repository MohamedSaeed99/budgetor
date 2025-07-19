import { Box } from '@mui/material'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'

const Home = () => {
  return (
    <Box sx={{height: "100vh", width: "100vw", display: "flex", flexDirection: "column"}}>
      <Box sx={{
        height: "40px",
        width: "100%",
      }}>
        <Header />
      </Box>
      <Box sx={{ width: "100%", height: "calc(~100% - 40px)", overflow: 'hidden' }}>
        <Main />
      </Box>
    </Box>
  )
}

export default Home 