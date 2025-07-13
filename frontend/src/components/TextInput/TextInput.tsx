import { IconButton, InputAdornment, OutlinedInput, type SxProps } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

type TextInputProps = {
    sx: SxProps,
    value?: string,
    placeholder?: string,
    handleSave: (value: string) => void,
    handleCancel: () => void
}

const TextInput = ({sx, value, placeholder, handleSave, handleCancel}: TextInputProps) => {
    const [inputValue, setInputValue] = useState(value ?? "");

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSave(inputValue);
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };
    return (
        <OutlinedInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            fullWidth
            autoFocus
            size="small"
            sx={{
                fontSize: '14px',
                padding: "0",
                "& .MuiInputBase-input": {
                    paddingLeft: "4px"
                },
                ...(sx),
            }}
            endAdornment={
                <InputAdornment position="end" sx={{m: 0}}>
                    <IconButton
                        size="small"
                        onClick={() => handleSave(inputValue)}
                        disabled={!inputValue.trim()}
                        sx={{ 
                            color: 'primary.main',
                            '&:hover': { color: 'primary.dark' },
                            padding: '2px'
                        }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={handleCancel}
                        sx={{ 
                            color: 'error.main',
                            '&:hover': { color: 'error.dark' },
                            padding: '2px'
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </InputAdornment>   
            }
        />
    )
}

export default TextInput;