import React from 'react';
import { Box, Typography } from '@mui/material';

const menuItems = [
  'Редактор каналов',
  'Редактор избранных списков',
  'Система',
  'Условный доступ',
  'USB медиа',
  'Интернет',
];

function MainScreen() {
  const [selected, setSelected] = React.useState(0);
  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Синий световой эффект */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '70%',
        height: '100%',
        background: 'radial-gradient(ellipse at right, #0033cc 0%, transparent 70%)',
        opacity: 0.25,
        pointerEvents: 'none',
      }} />
      {/* Основной контент */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        pl: 6,
        gap: 8,
      }}>
        {/* Круглая иконка ТВ */}
        <Box sx={{
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: '#181818',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px #000a',
        }}>
          <svg width="150" height="150" viewBox="0 0 140 140">
            <defs>
              <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#999" />
                <stop offset="50%" stopColor="#ccc" />
                <stop offset="100%" stopColor="#999" />
              </linearGradient>
            </defs>
            <rect x="30" y="35" width="80" height="50" fill="none" stroke="url(#iconGradient)" strokeWidth="6" rx="4"/>
            <rect x="45" y="90" width="50" height="7" fill="url(#iconGradient)" rx="2"/>
          </svg>
        </Box>
        {/* Меню справа */}
        <Box sx={{
          minWidth: 400,
          background: 'rgba(0,0,0,0.85)',
          borderRadius: 2,
          boxShadow: '0 0 30px #001a',
          px: 5,
          py: 4,
        }}>
          {/* Заголовок с синим свечением */}
          <Box sx={{
            mb: 3,
            py: 1,
            background: 'linear-gradient(90deg, #0033cc 0%, #222 100%)',
            borderRadius: 1,
            boxShadow: '0 0 16px #0090ff88',
          }}>
            <Typography align="center" sx={{ color: '#fff', fontWeight: 500, fontSize: 22, textShadow: '0 0 8px #0090ff' }}>
              {menuItems[0]}
            </Typography>
          </Box>
          {/* Остальные пункты */}
          <Box>
            {menuItems.slice(1).map((item, idx) => (
              <Typography
                key={item}
                sx={{
                  color: '#ccc',
                  fontSize: 20,
                  mb: 2,
                  pl: 2,
                  cursor: 'pointer',
                  '&:hover': { color: '#fff' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainScreen; 