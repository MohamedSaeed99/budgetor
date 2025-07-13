import { Button, IconButton, InputAdornment, OutlinedInput, type SxProps } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

type TextInputProps = {
    sx: SxProps,
    editing: boolean,
    value?: string,
    placeholder?: string,
    handleSave: (value: string) => void,
    handleCancel: () => void
}

const TextInput = ({sx, editing, value, placeholder, handleSave, handleCancel}: TextInputProps) => {
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
        <Button
            variant={"outlined"}
            size={"small"}
            sx={{
                textTransform: 'none',
                justifyContent: 'flex-start',
                minWidth: '80px',
                height: '32px',
                fontSize: '12px'
            }}
            onDoubleClick={() => setIsEditing(true)}
        >
            {value}
        </Button>
    )
}

export default TextInput;