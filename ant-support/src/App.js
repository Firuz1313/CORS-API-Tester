import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainScreen from './components/MainScreen';
import SystemSettings from './components/SystemSettings';
// Import ChannelList if it exists and is part of the routing
import ChannelList from './components/ChannelList'; 
import ErrorHintSelectionPage from './components/ErrorHintSelectionPage'; // Import the new page
import { TutorialProvider } from './contexts/TutorialContext'; // Import TutorialProvider
import './styles/tutorial.css';

// A base theme. Specific pages can override styles (e.g., MainScreen has a light bg).
const baseTheme = createTheme({
  palette: {
    mode: 'dark', // Default mode, SystemSettings uses a dark theme
    primary: { main: '#90caf9' },
    background: {
      default: '#121212', // Default dark background
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    }
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <TutorialProvider>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/system-settings" element={<SystemSettings />} />
          
          {/* Example route for ChannelList, uncomment and import if needed */}
          <Route path="/channels" element={<ChannelList />} /> 
          
          <Route path="/select-error-hint" element={<ErrorHintSelectionPage />} /> {/* New route */}
          
          {/* Redirect any unknown paths to the main screen */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TutorialProvider>
    </ThemeProvider>
  );
}

export default App; 