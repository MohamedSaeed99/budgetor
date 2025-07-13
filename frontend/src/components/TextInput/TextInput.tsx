import { Box, Button, IconButton, InputAdornment, OutlinedInput, Typography, type SxProps } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useState } from "react";

type TextInputProps = {
    sx: SxProps,
    editing: boolean,
    selected?: boolean,
    value?: string,
    placeholder?: string,
    handleSave: (value: string) => void,
    handleCancel: () => void,
    handleOnClick?: () => void,
}

const TextInput = ({sx, selected, editing, value, placeholder, handleSave, handleCancel, handleOnClick}: TextInputProps) => {
    const [inputValue, setInputValue] = useState(value ?? "");
    const [isEditing, setIsEditing] = useState<boolean>(editing ?? true)

    const onCancelEvent = () => {
        setIsEditing(false);
        setInputValue(value ?? "")
        handleCancel();
    }

    const onSaveEvent = () => {
        handleSave(inputValue)
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSaveEvent();
        } else if (event.key === 'Escape') {
            onCancelEvent()
        }
    };

    return (
        isEditing ?
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
                        onClick={onSaveEvent}
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
                        onClick={onCancelEvent}
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
        :
        <Box
            sx={{
                p: "0 4px",
                border: "0.5px solid rgba(0, 0, 0, 0.87)",
                borderRadius: "4px",
                bgcolor: selected ? "lightblue" : "unset",
                textTransform: 'none',
                display: "flex",
                ...(sx)
            }}
        >
            <Typography 
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    verticalAlign: "center",
                    width:"100%", 
                    ':hover': {
                    cursor: "pointer"
                }}}
                onClick={handleOnClick}
                onDoubleClick={() => setIsEditing(true)}
            >
                {value}
            </Typography>
            <IconButton sx={{zIndex: 1, padding: '0px'}}>
                <DeleteOutlineRoundedIcon onClick={() => console.log("test")} />
            </IconButton>
        </Box>
    )
}

export default TextInput;