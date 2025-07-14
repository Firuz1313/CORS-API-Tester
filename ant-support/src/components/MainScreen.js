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
];

const INITIAL_LOADING_TIME = 1200; // Slightly faster loading
const CARD_ENTRANCE_DELAY_INCREMENT = 100; // Quicker card entrance
const ANIMATION_DURATION = '0.4s'; // Increased duration
const EASING_FUNCTION = 'cubic-bezier(0.25, 0.8, 0.25, 1)'; // Custom easing

const keyframes = `
  @keyframes animatedRealisticBg {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes subtleTitleShimmer {
    0% { background-position: -150% center; }
    100% { background-position: 150% center; }
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
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: '#0a192f', // Solid dark blue loading bg
        p: 3, textAlign: 'center'
      }}>
        <style>{keyframes}</style>
        <CircularProgress size={50} sx={{ mb: 3, color: '#64b5f6' }} /> {/* Blue progress */}
        <Typography variant="h5" component="h1" gutterBottom sx={{ color: '#e0e0e0', fontWeight: '500' }}>Добро пожаловать!</Typography>
        <Typography variant="subtitle1" sx={{ color: '#bdbdbd' }}>Загрузка интерфейса управления...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh', p: { xs: 2, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center',
      overflow: 'hidden', 
      background: 'linear-gradient(145deg, #03080f 0%, #0a192f 30%, #1c2533 70%, #03080f 100%)', // Dark blue/black/gray gradient
      backgroundSize: '300% 300%', 
      animation: `animatedRealisticBg 35s ${EASING_FUNCTION} infinite`, // Slower, more subtle bg animation
    }}>
      <style>{keyframes}</style>
      <Typography variant="h3" component="h1" sx={{
        mt: 3, mb: 2, fontWeight: '600', 
        // Subtle shimmer with new palette
        background: 'linear-gradient(to right, #90a4ae, #e0e0e0, #90a4ae)', // Blue-gray, light-gray, blue-gray
        backgroundSize: '150% auto',
        color: 'transparent',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        animation: `subtleTitleShimmer 6s linear infinite`,
        opacity: elementsVisible ? 1 : 0,
        transform: elementsVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: `opacity ${ANIMATION_DURATION} ${EASING_FUNCTION} .4s, transform ${ANIMATION_DURATION} ${EASING_FUNCTION} .4s`,
      }}>
        Услуги
      </Typography>
      <Typography variant="h6" component="h2" sx={{
        mb: 1, color: '#b0bec5', // Lighter blue-gray
        opacity: elementsVisible ? 1 : 0,
        transform: elementsVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: `opacity ${ANIMATION_DURATION} ${EASING_FUNCTION} .5s, transform ${ANIMATION_DURATION} ${EASING_FUNCTION} .5s`,
      }}>
        Система помощи операторам
      </Typography>
      <Typography variant="subtitle1" sx={{
        mb: 4, color: '#78909c', // Medium blue-gray
        opacity: elementsVisible ? 1 : 0,
        transform: elementsVisible ? 'translateY(0)' : 'translateY(15px)',
        transition: `opacity ${ANIMATION_DURATION} ${EASING_FUNCTION} .6s, transform ${ANIMATION_DURATION} ${EASING_FUNCTION} .6s`,
      }}>
        Выберите пульт:
      </Typography>
      
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1300px', p:2 }}>
        {remotesData.map((remote, index) => (
          <Grid item xs={12} sm={6} md={4} key={remote.name}>
            <Card 
              onClick={() => handleRemoteSelect(remote.path)}
              onMouseEnter={() => setHoveredRemote(remote.name)}
              onMouseLeave={() => setHoveredRemote(null)}
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2.5,
                cursor: remote.path ? 'pointer' : 'default',
                border: '1px solid',
                borderColor: hoveredRemote === remote.name && remote.path ? '#2962ff' : '#37474f', // Blue highlight on hover, dark gray otherwise
                borderRadius: '12px', // Sharper radius
                backgroundColor: hoveredRemote === remote.name && remote.path ? '#102037' : '#0a192f', // Slightly lighter dark blue on hover
                opacity: elementsVisible ? 1 : 0,
                transform: elementsVisible 
                  ? (hoveredRemote === remote.name && remote.path ? 'translateY(-10px) scale(1.03)' : 'translateY(0px) scale(1)') // More subtle lift & scale, no rotate
                  : 'translateY(30px) scale(0.95)',
                boxShadow: hoveredRemote === remote.name && remote.path 
                  ? '0 8px 20px rgba(0, 90, 180, 0.25)' // Softer blueish shadow on hover
                  : '0 4px 10px rgba(0,0,0,0.4)', // More defined resting shadow
                transition: `transform ${ANIMATION_DURATION} ${EASING_FUNCTION}, box-shadow ${ANIMATION_DURATION} ${EASING_FUNCTION}, opacity ${ANIMATION_DURATION} ${EASING_FUNCTION}, background-color ${ANIMATION_DURATION} ${EASING_FUNCTION}, border-color ${ANIMATION_DURATION} ${EASING_FUNCTION}`,
                transitionDelay: elementsVisible ? '0ms' : `${index * CARD_ENTRANCE_DELAY_INCREMENT + 200}ms`,
              }}
            >
              <CardMedia
                component="img" alt={remote.name}
                image={remote.name === 'HDBox' && hoveredRemote === remote.name && remote.hoverImage ? remote.hoverImage : remote.image}
                sx={{ width: 400, height: 500, objectFit: 'contain', mb: 1.5, transition: `opacity ${ANIMATION_DURATION} ${EASING_FUNCTION}` }}
                onError={(e) => { 
                  const isHover = remote.name === 'HDBox' && hoveredRemote === remote.name && remote.hoverImage;
                  e.target.src = `https://via.placeholder.com/400x500.png?text=${remote.name}${isHover ? ' Hover' : ''}`;
                }}
              />
              <CardContent sx={{ textAlign: 'center', p: '0px !important', pt: '8px !important' }}>
                <Typography variant="subtitle1" component="div" sx={{
                  fontWeight: '500',
                  color: hoveredRemote === remote.name && remote.path ? '#ffffff' : '#bdbdbd', // White on hover, light gray otherwise
                  transform: hoveredRemote === remote.name && remote.path ? 'scale(1.05)' : 'scale(1)', // Less scale
                  transition: `color ${ANIMATION_DURATION} ${EASING_FUNCTION}, transform ${ANIMATION_DURATION} ${EASING_FUNCTION}`,
                }}>
                  {remote.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       <Box sx={{ 
         textAlign: 'center', mt: 5, mb:3, color: '#78909c', fontSize: '0.9rem',
         opacity: elementsVisible ? 1 : 0, transform: elementsVisible ? 'translateY(0)' : 'translateY(15px)',
         transition: `opacity ${ANIMATION_DURATION} ${EASING_FUNCTION} .7s, transform ${ANIMATION_DURATION} ${EASING_FUNCTION} .7s`,
        }}>
        <Typography variant="caption" sx={{letterSpacing: '0.3px'}}>
         Сайт был разработан в 2025 в г.Худжанта от PaPa Marinet. All rights reserved &copy;
        </Typography>
      </Box>
    </Box>
  );
}

export default MainScreen; 