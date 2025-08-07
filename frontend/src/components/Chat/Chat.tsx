import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your budget today?',
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true
      };

      setMessages(prev => [...prev, newUserMessage]);
      setInputValue('');

      // Simple response
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for your message! I\'m here to help with your budgeting needs.',
          isUser: false
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
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
      <Box sx={{ flex: 1, overflowY: 'auto', height: "100%" }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              mb: 1,
              wordBreak: "break-word",
              textAlign: message.isUser ? 'right' : 'left'
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                maxWidth: '70%',
                p: 1,
                borderRadius: 2,
                bgcolor: message.isUser ? 'primary.main' : 'grey.100',
                color: message.isUser ? 'white' : 'text.primary'
              }}
            >
              <Typography variant="body2">
                {message.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box component="form" onSubmit={handleSendMessage}>
        <TextField
          fullWidth
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