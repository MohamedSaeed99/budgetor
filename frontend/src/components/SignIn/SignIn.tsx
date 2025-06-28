import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../api/api";
import type { User } from "../../models/User.models";

type SignInProps = {
    loading: boolean,
    setLoading: (value: boolean) => void,
    onSuccess: (authData: any) => void
}

const SignIn = ({loading, setLoading, onSuccess}: SignInProps) => {
    const {mutate} = api.User.Login.useMutation()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
            if (!formData.email || !formData.password) {
                throw new Error('Please fill in all required fields');
            }
    
            mutate(
                { email: formData.email, password: formData.password },
                {
                    onSuccess: (authData) => {
                        onSuccess(authData);
                    },
                    onError: (error: any) => {
                        setError(error.message || 'Login failed');
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
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    size="small"
                    sx={{mb: 1.5}}
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
                                onClick={handleClickShowPassword}
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        fontWeight: 600,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                        },
                    }}
                    >
                    {loading ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>
        </>
    )
}

export default SignIn;