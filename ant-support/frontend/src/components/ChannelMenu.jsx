import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ChannelMenu() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(0);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background light effects */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '70%',
        height: '100%',
        background: 'radial-gradient(ellipse at right, #000066 0%, transparent 70%)',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />

      {/* Header with blue gradient */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        padding: '10px 20px',
        background: 'linear-gradient(to right, transparent, #000066)',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, #0066ff, transparent)',
        }
      }}>
        <Typography sx={{
          color: '#fff',
          fontSize: '1.1rem',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(0, 102, 255, 0.5)',
        }}>
          Редактор каналов
        </Typography>
      </Box>

      {/* Main content */}
      <Box sx={{
        display: 'flex',
        padding: '40px',
        gap: '60px',
      }}>
        {/* Large TV icon in circle */}
        <Box sx={{
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          backgroundColor: '#111111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 40px rgba(0,0,0,0.8)',
        }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#999999" />
                <stop offset="50%" stopColor="#cccccc" />
                <stop offset="100%" stopColor="#999999" />
              </linearGradient>
            </defs>
            <rect
              x="30"
              y="35"
              width="80"
              height="50"
              fill="none"
              stroke="url(#iconGradient)"
              strokeWidth="4"
            />
            <rect
              x="45"
              y="85"
              width="50"
              height="4"
              fill="url(#iconGradient)"
            />
          </svg>
        </Box>

        {/* Menu items */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          paddingTop: '20px',
        }}>
          <Typography
            onClick={() => setSelectedItem(0)}
            sx={{
              fontSize: '1.1rem',
              color: selectedItem === 0 ? '#ffffff' : '#cccccc',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: '#ffffff' },
            }}
          >
            Редактор каналов
          </Typography>
          <Typography
            onClick={() => setSelectedItem(1)}
            sx={{
              fontSize: '1.1rem',
              color: selectedItem === 1 ? '#ffffff' : '#cccccc',
              cursor: 'pointer',
              transition: 'color 0.2s',
              '&:hover': { color: '#ffffff' },
            }}
          >
            Редактор избранных списков
          </Typography>
        </Box>
      </Box>

      {/* Bottom light effect */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '60%',
        height: '300px',
        background: 'radial-gradient(ellipse at bottom right, #000066 0%, transparent 70%)',
        opacity: 0.2,
        pointerEvents: 'none',
      }} />
    </Box>
  );
}

export default ChannelMenu; 