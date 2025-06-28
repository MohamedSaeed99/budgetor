import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../api/api";

type SignUpProps = {
    loading: boolean,
    setLoading: (value: boolean) => void,
    onSuccess: (authData: any) => void
}

const SignUp = ({loading, setLoading, onSuccess}: SignUpProps) => {
    const {mutate} = api.User.Register.useMutation()

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
          // Validate form data
          if (!formData.email || !formData.password) {
            throw new Error('Please fill in all required fields');
          }
    
          if (formData.password !== formData.confirmPassword) {
            throw new Error('Passwords do not match');
          }
    
          if (!formData.name) {
            throw new Error('Please enter your name');
          }
    
          mutate(
            {full_name: formData.name, email: formData.email, password: formData.password},
            {
                onSuccess: (authData) => {
                    onSuccess(authData);
                },
                onError: (error: any) => {
                    setError(error.message || 'Registration failed');
                    setLoading(false);
                }
            }
          );
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setLoading(false);
        }
    };

    return (
        <>
            {error && (
                <Alert severity="error" sx={{ mb: 2, py: 0.5 }}>
                {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    sx={{ mb: 1.5 }}
                    size="small"
                />
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    sx={{ mb: 1.5 }}
                    size="small"
                />
                <FormControl fullWidth size="small" sx={{mb: 1.5}}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePassword}
                                edge="end"
                                size="small"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <FormControl fullWidth size="small" sx={{mb: 2}}>
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleToggleConfirmPassword}
                                edge="end"
                                size="small"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                </FormControl>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                    py: 1,
                    mb: 1.5,
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                    },
                    fontWeight: 600,
                    fontSize: '0.9rem'
                }}
                >
                {loading ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    'Create Account'
                )}
                </Button>
            </form>
        </>
    )
}

export default SignUp;