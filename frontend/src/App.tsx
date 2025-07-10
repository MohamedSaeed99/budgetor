import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Login from './page/Login/Login'
import Home from './page/Home/Home'
import { AuthProvider, useAuth } from './context/AuthContext'
import { UserLocationProvider } from './context/UserLocation'

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Box sx={{height: "100vh", width: "100vw"}}>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} 
        />
      </Routes>
    </Box>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <UserLocationProvider>
          <AppRoutes />
        </UserLocationProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
