import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useWebSocket from '../../hooks/useWebsocket';
import Loader from '../Loader/Loader';
import { useFormData } from '../../context/FormData';

const Chat = () => {
  const {getBudgetAmount, getCategories, getBudgetPeriod} = useFormData();
  const {sendMessage, messages, isLoading} = useWebSocket();
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue, getBudgetAmount(), getCategories(), getBudgetPeriod())
      setInputValue('');
    }
  };

  return (
    <Box sx={{ 
        padding: "12px",
        display: 'flex', 
        flexDirection: 'column', 
        gap: "8px",
        border: '1px solid #e0e0e0',
        borderRadius: 2,
    }}>
      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: "75vh", width: "400px" }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              mb: 1,
              wordBreak: "break-word",
              textAlign: message.isUser ? 'right' : 'left'
            }}
          >
            <Typography variant="body2" 
              sx={{
                display: 'inline-block',
                maxWidth: '70%',
                p: 1,
                borderRadius: 2,
                bgcolor: message.isUser ? 'primary.main' : 'grey.100',
                color: message.isUser ? 'white' : 'text.primary',
                textAlign: 'left'
              }}>
              {message.text}
            </Typography>
          </Box>
        ))}
        { isLoading &&
          <Box sx={{
            mt: 3,
            wordBreak: "break-word",
            textAlign: "left",
          }}>
            <Loader />
          </Box>
        }
      </Box>

      {/* Input */}
      <Box component="form" onSubmit={handleSendMessage}>
        <TextField
          fullWidth
          multiline
          maxRows={5}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ minWidth: 'auto', p: 0.5 }}
                >
                  <SendIcon fontSize="small" />
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
};

export default Chat;