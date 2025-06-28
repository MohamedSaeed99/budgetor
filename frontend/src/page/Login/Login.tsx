import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Divider,
  Paper,
} from '@mui/material';
import {
  Google as GoogleIcon,
} from '@mui/icons-material';
import AppInformation from '../../components/AppInformation/AppInformation';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const handleSuccessfulAuth = () => {
        login();
        navigate('/');
    };

    function handleGoogleLogin(event: any): void {
        // Implement Google login logic here
        console.log('Google login clicked');
    }

    return (
        <Box sx={{ 
        height: '100%', 
        display: 'flex',
        }}>
        {/* Left Side - App Description */}
        <AppInformation />

        {/* Right Side - Login Form */}
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
        }}>
            <Paper 
            elevation={24}
            sx={{
                p: 3,
                borderRadius: 2,
                width: '100%',
                maxWidth: 350,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            >
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography 
                    variant="h5" 
                    component="h1" 
                    sx={{ 
                        fontWeight: 700, 
                        color: '#2c3e50',
                        mb: 0.5
                    }}
                    >
                    Budgetor
                    </Typography>
                    <Typography 
                    variant="body2" 
                    sx={{ 
                        color: '#7f8c8d',
                        fontWeight: 500
                    }}
                    >
                    {isLogin ? 'Welcome back!' : 'Create your account'}
                    </Typography>
                </Box>

                {isLogin ? 
                    <SignIn loading={loading} setLoading={setLoading} onSuccess={handleSuccessfulAuth} /> : 
                    <SignUp loading={loading} setLoading={setLoading} onSuccess={handleSuccessfulAuth} />
                }

                <Divider sx={{ my: 2 }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    OR
                    </Typography>
                </Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    size="small"
                    sx={{
                    py: 1,
                    mb: 2,
                    borderColor: '#db4437',
                    color: '#db4437',
                    '&:hover': {
                        borderColor: '#c23321',
                        backgroundColor: 'rgba(219, 68, 55, 0.04)',
                    },
                    fontWeight: 600
                    }}
                >
                    Continue with Google
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Button
                        onClick={toggleMode}
                        size="small"
                        sx={{
                        color: '#667eea',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                        p: 0.5,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline'
                        }
                        }}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </Button>
                    </Typography>
                </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Login;