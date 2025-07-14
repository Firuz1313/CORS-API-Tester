import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const remotesData = [
  { name: 'OpenBox', image: '/images/openbox.png' },
  {
    name: 'HDBox',
    image: '/images/hdbox.png',
    hoverImage: '/images/hdbox-hover.png',
    path: '/select-error-hint'
  },
  { name: 'Uclan', image: '/images/uclan.png' },
  { name: 'OpenboxGold', image: '/images/openboxgold.png' },
];

const INITIAL_LOADING_TIME = 1500;
const CARD_ENTRANCE_DELAY_INCREMENT = 150;
const ANIMATION_DURATION = '0.5s';
const EASING_FUNCTION = 'cubic-bezier(0.4, 0, 0.2, 1)';

const keyframes = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
    50% { box-shadow: 0 0 20px rgba(66, 165, 245, 0.8); }
    100% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

function MainScreen() {
  const [loading, setLoading] = useState(true);
  const [elementsVisible, setElementsVisible] = useState(false);
  const [hoveredRemote, setHoveredRemote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), INITIAL_LOADING_TIME);
    const visibilityTimer = setTimeout(() => setElementsVisible(true), INITIAL_LOADING_TIME + 50);
    return () => { clearTimeout(loadingTimer); clearTimeout(visibilityTimer); };
  }, []);

  const handleRemoteSelect = (path) => path ? navigate(path) : alert('This remote selection is not yet implemented.');

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #1a237e, #0d47a1, #01579b)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        p: 3,
        textAlign: 'center'
      }}>
        <style>{keyframes}</style>
        <CircularProgress 
          size={60} 
          sx={{ 
            mb: 3, 
            color: '#64b5f6',
            animation: 'pulse 2s infinite'
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#ffffff',
            fontWeight: '600',
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
            animation: 'fadeInUp 1s ease-out'
          }}
        >
          Добро пожаловать!
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#e3f2fd',
            animation: 'fadeInUp 1s ease-out 0.3s both'
          }}
        >
          Загрузка интерфейса управления...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
      py: 4,
      px: 2,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <style>{keyframes}</style>
      
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{
          textAlign: 'center',
          color: '#ffffff',
          mb: 6,
          fontWeight: '700',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          animation: 'fadeInUp 1s ease-out',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #64b5f6, transparent)',
            borderRadius: '2px'
          }
        }}
      >
        Добро пожаловать
      </Typography>

      <Typography 
        variant="h5" 
        sx={{
          mb: 6,
          color: '#e3f2fd',
          opacity: elementsVisible ? 1 : 0,
          transform: elementsVisible ? 'translateY(0)' : 'translateY(15px)',
          transition: `opacity ${ANIMATION_DURATION} ${EASING_FUNCTION} .6s, transform ${ANIMATION_DURATION} ${EASING_FUNCTION} .6s`,
          textAlign: 'center',
          fontWeight: '500',
          animation: 'fadeInUp 1s ease-out 0.3s both'
        }}
      >
        Выберите модель вашего пульта:
      </Typography>
      
      <Grid container spacing={4} justifyContent="center" sx={{ 
        maxWidth: '1600px', 
        mx: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {remotesData.map((remote, index) => (
          <Grid item xs={12} sm={6} md={3} key={remote.name} sx={{ 
            display: 'flex',
            justifyContent: 'center',
            width: 'auto'
          }}>
            <Card 
              onClick={() => handleRemoteSelect(remote.path)}
              onMouseEnter={() => setHoveredRemote(remote.name)}
              onMouseLeave={() => setHoveredRemote(null)}
              sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                p: 2,
                cursor: 'pointer',
                border: '2px solid',
                borderColor: hoveredRemote === remote.name ? '#64b5f6' : 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                opacity: elementsVisible ? 1 : 0,
                transform: elementsVisible 
                  ? (hoveredRemote === remote.name ? 'translateY(-10px) scale(1.05)' : 'translateY(0px) scale(1)')
                  : 'translateY(30px) scale(0.95)',
                boxShadow: hoveredRemote === remote.name
                  ? '0 8px 32px rgba(100, 181, 246, 0.3)'
                  : '0 4px 16px rgba(0,0,0,0.2)',
                transition: `all ${ANIMATION_DURATION} ${EASING_FUNCTION}`,
                transitionDelay: elementsVisible ? '0ms' : `${index * CARD_ENTRANCE_DELAY_INCREMENT + 200}ms`,
                width: '280px',
                height: '400px',
                position: 'relative',
                animation: 'float 6s ease-in-out infinite',
                '&:hover': {
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }
                }
              }}
            >
              <CardMedia
                component="img"
                alt={remote.name}
                image={remote.name === 'HDBox' && hoveredRemote === remote.name && remote.hoverImage ? remote.hoverImage : remote.image}
                sx={{ 
                  width: '100%',
                  height: '300px',
                  objectFit: 'contain',
                  mb: 1,
                  transition: `all ${ANIMATION_DURATION} ${EASING_FUNCTION}`,
                  filter: hoveredRemote === remote.name ? 'drop-shadow(0 0 10px rgba(100, 181, 246, 0.5))' : 'none'
                }}
                onError={(e) => { 
                  const isHover = remote.name === 'HDBox' && hoveredRemote === remote.name && remote.hoverImage;
                  e.target.src = `https://via.placeholder.com/280x300.png?text=${remote.name}${isHover ? ' Hover' : ''}`;
                }}
              />
              <CardContent sx={{ 
                textAlign: 'center', 
                p: '0px !important', 
                pt: '8px !important',
                width: '100%',
                position: 'relative'
              }}>
                {hoveredRemote === remote.name && (
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: '#64b5f6',
                      fontSize: '0.9rem',
                      mb: 1,
                      textShadow: '0 0 10px rgba(100, 181, 246, 0.5)',
                      animation: 'fadeInUp 0.3s ease-out'
                    }}
                  >
                    Нажмите для выбора
                  </Typography>
                )}
                <Typography variant="h6" component="div" sx={{
                  fontWeight: '600',
                  color: hoveredRemote === remote.name ? '#ffffff' : '#e3f2fd',
                  transform: hoveredRemote === remote.name ? 'scale(1.05)' : 'scale(1)',
                  transition: `all ${ANIMATION_DURATION} ${EASING_FUNCTION}`,
                  fontSize: '1.2rem',
                  textShadow: hoveredRemote === remote.name ? '0 0 10px rgba(100, 181, 246, 0.5)' : 'none'
                }}>
                  {remote.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MainScreen; 