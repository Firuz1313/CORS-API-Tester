import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// SVG иконки (скопированы из MainMenu.jsx)
const iconChannel = (
  <svg width="80" height="80" viewBox="0 0 80 80">
    <rect x="20" y="20" width="40" height="30" fill="none" stroke="#999999" strokeWidth="2"/>
    <rect x="25" y="50" width="30" height="2" fill="#999999"/>
  </svg>
);

const iconInstallation = (
  <svg width="80" height="80" viewBox="0 0 80 80">
    <path d="M40 20 C40 20, 60 20, 60 40" fill="none" stroke="#999999" strokeWidth="2"/>
    <path d="M20 40 L60 40" stroke="#999999" strokeWidth="2"/>
  </svg>
);

const iconSystem = (
  <svg width="80" height="80" viewBox="0 0 80 80">
    <circle cx="40" cy="40" r="20" fill="none" stroke="#999999" strokeWidth="2"/>
    <path d="M40 20 L40 60" stroke="#999999" strokeWidth="2"/>
    <path d="M20 40 L60 40" stroke="#999999" strokeWidth="2"/>
  </svg>
);

const iconAccess = (
  <svg width="80" height="80" viewBox="0 0 80 80">
    <circle cx="40" cy="40" r="20" fill="none" stroke="#999999" strokeWidth="2"/>
    <path d="M35 35 L45 45" stroke="#999999" strokeWidth="2"/>
    <path d="M45 35 L35 45" stroke="#999999" strokeWidth="2"/>
  </svg>
);

const iconUsb = (
  <svg width="80" height="80" viewBox="0 0 80 80">
    <rect x="25" y="25" width="30" height="25" fill="none" stroke="#999999" strokeWidth="2"/>
    <path d="M30 37 L50 37" stroke="#999999" strokeWidth="2"/>
  </svg>
);

const iconInternet = (
  <svg width="80" height="80" viewBox="0 0 80 80">
    <path d="M20 30 L30 30 L35 55 L55 55" stroke="#999999" strokeWidth="2" fill="none"/>
    <path d="M30 30 L55 30 L50 55" stroke="#999999" strokeWidth="2" fill="none"/>
    <circle cx="35" cy="55" r="3" fill="#999999"/>
    <circle cx="50" cy="55" r="3" fill="#999999"/>
  </svg>
);

function SystemSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(0);
  const [activeTutorial, setActiveTutorial] = useState(null);

  useEffect(() => {
    const tutorialId = location.state?.tutorialId;
    const currentStep = location.state?.currentStep;

    if (tutorialId) {
      console.log(`Tutorial started: ${tutorialId}, Step: ${currentStep}`);
      setActiveTutorial(`Активна подсказка: ${tutorialId}, Шаг: ${currentStep + 1}`);
    }
  }, [location.state]);

  const menuItems = [
    {
      title: 'Канал',
      subMenu: ['Редактор каналов', 'Редактор избранных списков'],
      path: '/channels',
      icon: iconChannel,
    },
    {
      title: 'Инсталляция',
      path: '/installation',
      icon: iconInstallation,
    },
    {
      title: 'Система',
      path: '/system',
      icon: iconSystem,
    },
    {
      title: 'Условный доступ',
      path: '/access',
      icon: iconAccess,
    },
    {
      title: 'USB медиа',
      path: '/usb',
      icon: iconUsb,
    },
    {
      title: 'Интернет',
      path: '/internet',
      icon: iconInternet,
    },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000022 0%, #000044 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("/wave-bg.svg")',
        backgroundSize: 'cover',
        opacity: 0.4,
        zIndex: 0,
      }
    }}>
      {activeTutorial && (
        <Box sx={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'rgba(0, 128, 0, 0.8)',
          color: 'white',
          p: '10px 20px',
          borderRadius: '5px',
          zIndex: 1000,
          boxShadow: '0px 2px 10px rgba(0,0,0,0.5)'
        }}>
          <Typography>{activeTutorial}</Typography>
        </Box>
      )}
      {/* Main Content */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Selected Item Details */}
        <Box sx={{
          flex: 1,
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          {/* Icon Circle */}
          <Box sx={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            bgcolor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0,0,0,0.7)',
          }}>
            {/* Большая иконка текущего выбранного пункта меню */}
            {menuItems[selectedItem].icon && React.cloneElement(menuItems[selectedItem].icon, { width: 100, height: 100 })}
          </Box>

          {/* Submenu */}
          <Box sx={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '12px 25px',
            borderRadius: '8px',
            width: '380px',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingTop: '30px',
            position: 'relative',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 100, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #0066cc, transparent)',
              opacity: 0.7,
              boxShadow: '0 0 15px rgba(0, 102, 204, 0.5)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0, 102, 204, 0.1) 0%, transparent 15%)',
              pointerEvents: 'none'
            }
          }}>
            {menuItems[selectedItem].subMenu && menuItems[selectedItem].subMenu.map((subItem, subIndex) => (
              <Typography
                key={subIndex}
                id={subItem === 'Редактор каналов' ? 'submenu-редактор-каналов' : `submenu-${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '8px 0',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  pl: 2,
                  '&:hover': {
                    color: '#4488ff',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    transform: 'translateX(5px)',
                    boxShadow: 'inset 0 0 10px rgba(0, 102, 204, 0.1)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#0066cc',
                    opacity: 0.7
                  },
                  '&:not(:last-child)': {
                    marginBottom: '6px',
                  }
                }}
                onClick={() => {
                  if (menuItems[selectedItem].title === 'Канал' && subItem === 'Редактор каналов') {
                    navigate('/channels');
                  } else if (menuItems[selectedItem].title === 'Канал' && subItem === 'Редактор избранных списков') {
                    navigate('/favorite-editor');
                  } else {
                    // Общая логика навигации, если потребуется для других подменю
                    // navigate(menuItems[selectedItem].path); // Или специфичный путь для подменю
                  }
                }}
              >
                {subItem}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Bottom Navigation */}
        <Box sx={{
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          p: '10px 0',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 -5px 15px rgba(0,0,0,0.3)',
        }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                id={item.title === 'Канал' ? 'main-menu-item-канал' : `main-menu-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedItem(index)}
                sx={{
                  cursor: 'pointer',
                  opacity: selectedItem === index ? 1 : 0.7,
                  transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  p: '5px 10px',
                  minWidth: '80px',
                  textAlign: 'center',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <Box sx={{ fontSize: '2rem', lineHeight: 1 }}>
                  {React.cloneElement(item.icon, { width: 32, height: 32 })}
                </Box>
                <Typography sx={{
                  color: selectedItem === index ? '#44aaff' : '#cccccc',
                  fontSize: '0.7rem',
                  fontWeight: selectedItem === index ? 'bold' : 'normal',
                  mt: '2px'
                }}>
                  {item.title}
                </Typography>
              </Box>
              {index < menuItems.length - 1 && (
                <Box sx={{
                  width: '1px',
                  height: '40px',
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  alignSelf: 'center'
                }} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default SystemSettings; 