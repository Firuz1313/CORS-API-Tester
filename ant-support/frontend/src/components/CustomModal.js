import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450, // Slightly wider for confirm buttons
  bgcolor: 'background.paper',
  border: '1px solid #444', // Softer border
  boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
  p: 3, // Adjusted padding
  borderRadius: '12px',
  textAlign: 'center',
  background: 'linear-gradient(145deg, #232a38, #2c3e50)', // Darker gradient
  color: 'white',
};

function CustomModal({ 
  isOpen, 
  message, 
  onClose, 
  onConfirm,
  title = 'Информация', // Default title
  confirmText = 'Да', 
  cancelText = 'Нет',
  okText = 'OK',
  showConfirmButtons = false, 
  showPasswordInput = false, // New prop
  passwordLabel = 'Пароль:', // New prop
  onPasswordSubmit // New prop (receives password string)
}) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPassword(''); // Reset password when modal opens
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleInternalConfirm = () => {
    if (showPasswordInput) {
      if (onPasswordSubmit) {
        onPasswordSubmit(password);
      }
      // Don't close here, let onPasswordSubmit decide success/failure and next modal
    } else {
      if (onConfirm) {
        onConfirm();
      }
      onClose(); // Close modal after normal confirm
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose} // Allow closing by clicking backdrop
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2, fontWeight: '500' }}>
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mb: showPasswordInput ? 1.5 : 3, fontSize: '1rem', color: '#e0e0e0' }}>
          {message}
        </Typography>

        {showPasswordInput && (
          <TextField 
            type="password"
            label={passwordLabel}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{
              mb: 2.5,
              input: { color: 'white' },
              label: { color: '#ccc' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#777' },
                '&.Mui-focused fieldset': { borderColor: '#007bff' },
              },
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleInternalConfirm();
              }
            }}
          />
        )}

        <Box sx={{ display: 'flex', justifyContent: (showConfirmButtons || showPasswordInput) ? 'space-between' : 'center', gap: 2, mt: 1 }}>
          {(showConfirmButtons || showPasswordInput) ? (
            <>
              <Button 
                onClick={handleInternalConfirm} 
                variant="contained"
                sx={{ 
                  bgcolor: '#28a745', // Green for confirm
                  '&:hover': { bgcolor: '#1e7e34' },
                  px: 3
                }}
              >
                {showPasswordInput ? okText : confirmText} {/* Use okText for password submission or specific confirmText */}
              </Button>
              <Button 
                onClick={onClose} 
                variant="outlined"
                 sx={{ 
                  borderColor: '#dc3545', // Red for cancel
                  color: '#dc3545',
                  '&:hover': { borderColor: '#c82333', bgcolor: 'rgba(220, 53, 69, 0.1)' },
                  px: 3
                }}
              >
                {cancelText}
              </Button>
            </>
          ) : (
            <Button 
              onClick={onClose} 
              variant="contained"
              sx={{ 
                bgcolor: '#007bff', 
                '&:hover': { bgcolor: '#0056b3' },
                px: 4
              }}
            >
              {okText}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default CustomModal; 