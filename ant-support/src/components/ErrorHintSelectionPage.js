import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Paper, Divider } from '@mui/material';

const guides = [
  {
    id: 'blockChannels',
    title: 'Блокировать каналы',
    description: 'Пошаговое руководство по блокировке и разблокировке каналов в редакторе.',
    startPath: '/system-settings',
  },
  // Add more guides here in the future
  // {
  //   id: 'editFavorites',
  //   title: 'Редактировать списки избранного',
  //   description: 'Как создавать и изменять списки избранных каналов.',
  //   startPath: '/system-settings',
  // },
];

function ErrorHintSelectionPage() {
  const navigate = useNavigate();

  const handleGuideSelect = (guide) => {
    navigate(guide.startPath, { state: { tutorialId: guide.id, currentStep: 0 } });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000033 0%, #000066 70%, #000033 100%)',
      color: 'white',
      p: { xs: 2, sm: 3, md: 4 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Paper sx={{
        p: { xs: 2, sm: 3 }, 
        width: '100%', 
        maxWidth: '700px', 
        bgcolor: 'rgba(10, 25, 41, 0.85)', // Dark, slightly transparent background
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        mt: 4
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 500, mb: 1 }}>
          Список ошибок и подсказок
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', color: '#b0bec5', mb: 3 }}>
          Выберите тему для получения пошаговых инструкций по настройке ТВ.
        </Typography>
        <List>
          {guides.map((guide, index) => (
            <React.Fragment key={guide.id}>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleGuideSelect(guide)}
                  sx={{
                    borderRadius: '8px',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      bgcolor: 'rgba(0, 102, 204, 0.2)',
                    },
                    py: 1.5
                  }}
                >
                  <ListItemText 
                    primary={<Typography variant="h6" component="span">{guide.title}</Typography>}
                    secondary={<Typography variant="body2" sx={{color: '#9e9e9e', mt: 0.5}}>{guide.description}</Typography>}
                  />
                </ListItemButton>
              </ListItem>
              {index < guides.length - 1 && <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 1}} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default ErrorHintSelectionPage; 