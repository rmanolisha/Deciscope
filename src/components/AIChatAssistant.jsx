import React, { useState } from 'react';
import { 
  Box, 
  Fab, 
  Paper, 
  Typography, 
  IconButton, 
  TextField,
  Avatar,
  Fade
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Deciscope assistant 🌈 Need help thinking through a decision?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "That sounds like an important decision. Try describing it in the Dashboard to see potential biases!", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{ marginBottom: 16 }}
          >
            <Paper 
              elevation={6}
              sx={{ 
                width: 320, 
                height: 450, 
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              {/* Header */}
              <Box sx={{ p: 2, bgcolor: '#60a5fa', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: 'white', width: 32, height: 32 }}>🌈</Avatar>
                  <Typography variant="subtitle1" fontWeight="bold">Deciscope AI</Typography>
                </Box>
                <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Chat Content */}
              <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messages.map((msg, i) => (
                  <Box 
                    key={i} 
                    sx={{ 
                      alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                      maxWidth: '80%',
                      p: 1.5,
                      borderRadius: msg.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                      bgcolor: msg.isBot ? '#f1f5f9' : '#60a5fa',
                      color: msg.isBot ? '#475569' : 'white',
                      fontSize: '0.875rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    {msg.text}
                  </Box>
                ))}
              </Box>

              {/* Input */}
              <Box component="form" onSubmit={handleSend} sx={{ p: 2, borderTop: '1px solid #e2e8f0', display: 'flex', gap: 1 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
                <IconButton type="submit" color="primary" sx={{ bgcolor: '#60a5fa', color: 'white', '&:hover': { bgcolor: '#3b82f6' } }}>
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      <Fab 
        color="primary" 
        onClick={() => setIsOpen(!isOpen)}
        sx={{ 
          bgcolor: '#60a5fa', 
          '&:hover': { bgcolor: '#3b82f6' },
          boxShadow: '0 4px 20px rgba(96, 165, 250, 0.4)'
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </Box>
  );
};

export default AIChatAssistant;
