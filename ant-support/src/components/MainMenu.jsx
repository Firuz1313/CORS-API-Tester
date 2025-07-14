import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    title: 'Канал',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <rect x="20" y="20" width="40" height="30" fill="none" stroke="#999999" strokeWidth="2"/>
        <rect x="25" y="50" width="30" height="2" fill="#999999"/>
      </svg>
    ),
    path: '/channels'
  },
  {
    title: 'Инсталляция',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <path d="M40 20 C40 20, 60 20, 60 40" fill="none" stroke="#999999" strokeWidth="2"/>
        <path d="M20 40 L60 40" stroke="#999999" strokeWidth="2"/>
      </svg>
    ),
    path: '/installation'
  },
  {
    title: 'Система',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="20" fill="none" stroke="#999999" strokeWidth="2"/>
        <path d="M40 20 L40 60" stroke="#999999" strokeWidth="2"/>
        <path d="M20 40 L60 40" stroke="#999999" strokeWidth="2"/>
      </svg>
    ),
    path: '/system'
  },
  {
    title: 'Условный доступ',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="20" fill="none" stroke="#999999" strokeWidth="2"/>
        <path d="M35 35 L45 45" stroke="#999999" strokeWidth="2"/>
        <path d="M45 35 L35 45" stroke="#999999" strokeWidth="2"/>
      </svg>
    ),
    path: '/access'
  },
  {
    title: 'USB медиа',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <rect x="25" y="25" width="30" height="25" fill="none" stroke="#999999" strokeWidth="2"/>
        <path d="M30 37 L50 37" stroke="#999999" strokeWidth="2"/>
      </svg>
    ),
    path: '/usb'
  },
  {
    title: 'Интернет',
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80">
        <path d="M20 30 L30 30 L35 55 L55 55" stroke="#999999" strokeWidth="2" fill="none"/>
        <path d="M30 30 L55 30 L50 55" stroke="#999999" strokeWidth="2" fill="none"/>
        <circle cx="35" cy="55" r="3" fill="#999999"/>
        <circle cx="50" cy="55" r="3" fill="#999999"/>
      </svg>
    ),
    path: '/internet'
  }
];

function MainMenu() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(0);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#000000',
      color: 'white',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(to bottom, #111111, transparent)',
      }
    }}>
      {/* Yellow triangle indicator */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: selectedItem * (100 / menuItems.length) + '%',
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: '8px solid #FFD700',
        transform: 'translateX(-50%)',
        transition: 'left 0.3s ease-in-out',
        zIndex: 2
      }} />

      {/* Main menu container */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '1rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {menuItems.map((item, index) => (
          <Box
            key={index}
            onClick={() => {
              setSelectedItem(index);
              navigate(item.path);
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: selectedItem === index ? 1 : 0.7,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '0.85rem',
                textAlign: 'center',
                marginBottom: '0.75rem',
                opacity: 0.9
              }}
            >
              {item.title}
            </Typography>
            <Box sx={{
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'brightness(1.1)',
            }}>
              {item.icon}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default MainMenu; 