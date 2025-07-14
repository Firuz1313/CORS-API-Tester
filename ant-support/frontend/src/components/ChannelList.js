import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Sync,
  LockOpen,
  Lock,
  Close,
  Edit,
  ArrowForward,
  Search,
  ArrowBack,
  RadioButtonChecked,
} from '@mui/icons-material';
import CustomModal from './CustomModal';

const generateChannels = () => {
  const channels = [];
  const channelNames = [
    'Первый канал HD', 'Россия 1 HD', 'НТВ HD', 'ТНТ HD', 'СТС HD', 
    'Рен-ТВ HD', 'ТВ3 HD', 'Пятница HD', 'Звезда HD', 'МИР HD',
    'Nat Geo Wild HD', 'Discovery HD', 'Animal Planet HD', 'History HD', 
    'RTG HD', 'Mezzo Live HD', 'MGM HD', 'Eurosport 1 HD', 'Eurosport 2 HD',
    'Match TV HD', 'КХЛ HD', 'Viasat Sport HD', 'ESPN HD', 'Fox Sports HD',
    'National Geographic HD', 'Amedia Premium HD', '1HD', 'MTV HD', 'VH1 HD',
    'Nickelodeon HD', 'Cartoon Network HD', 'Disney HD', 'Fox HD', 'Sony HD','АНТ-ОИЛА',
    'АНТ-МУЗЫКА', 'АНТ-КИНО', 'АНТ-ПРЕМИУМ', 'АНТ-СЕРИАЛ', 'АНТ-ОЛАМ',
    'АНТ-КУДАКОНА', 'АНТ-БИЗНЕС', 'АНТ-ШАШМАКОМ', 'АНТ-COMEDY'
  ];

  for (let i = 1; i <= 182; i++) {
    const channelId = i.toString().padStart(4, '0');
    const name = channelNames[Math.floor(Math.random() * channelNames.length)];
    channels.push({
      id: channelId,
      name: name,
      paid: true,
      hd: true,
      locked: Math.random() < 0.3 // Approx 30% of channels will be locked initially
    });
  }
  return channels;
};

function ChannelList() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState(generateChannels());
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [optionsAnchorEl, setOptionsAnchorEl] = useState(null);
  const [isMoveModeActive, setIsMoveModeActive] = useState(false);
  const [moveTargetIndex, setMoveTargetIndex] = useState(null);
  
  const [currentModalProps, setCurrentModalProps] = useState({
    isOpen: false, 
    message: '', 
    title: 'Информация',
    showConfirmButtons: false, 
    onConfirm: null, 
    confirmText:'Да', 
    cancelText:'Нет', 
    okText:'OK',
    showPasswordInput: false, // Explicit default
    passwordLabel: 'Пароль:', // Explicit default
    onPasswordSubmit: null // Explicit default
  });

  const HARDCODED_PASSWORD = "2046"; // Updated password

  const openModal = useCallback((newProps) => {
    setCurrentModalProps({
      // Start with base defaults for any new modal opening
      isOpen: true,
      message: '', // Default message, should be overridden by newProps
      title: 'Информация', // Default title
      showConfirmButtons: false, // Default
      onConfirm: null, // Default
      confirmText: 'Да', // Default
      cancelText: 'Нет', // Default
      okText: 'OK', // Default
      showPasswordInput: false, // Default: no password input
      passwordLabel: 'Пароль:', // Default label
      onPasswordSubmit: null, // Default: no password submission logic
      // Then merge the specific props for this modal instance, overriding defaults
      ...newProps 
    });
  }, [setCurrentModalProps]);

  const closeModal = useCallback(() => {
    setCurrentModalProps(prev => ({
      ...prev, // Keep basic text if needed, or reset all non-essential ones too
      isOpen: false,
      // Crucially reset interactive/type-specific props
      onConfirm: null,
      showConfirmButtons: false,
      showPasswordInput: false,
      onPasswordSubmit: null
    }));
  }, [setCurrentModalProps]);

  const handleOptionsClick = (event) => {
    setOptionsAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = useCallback(() => {
    setOptionsAnchorEl(null);
  }, [setOptionsAnchorEl]);

  const handleSelectAll = useCallback(() => {
    const allChannelIds = channels.map(channel => channel.id);
    setSelectedChannels(allChannelIds);
    handleOptionsClose();
  }, [channels, setSelectedChannels, handleOptionsClose]);

  const handleDeselectAll = useCallback(() => {
    setSelectedChannels([]);
    handleOptionsClose();
  }, [setSelectedChannels, handleOptionsClose]);

  const handleOptionSelect = useCallback((option) => {
    console.log('Selected option:', option);
    handleOptionsClose();
  }, [handleOptionsClose]);

  const handleChannelClick = useCallback((channelId, index) => {
    if (isMoveModeActive) {
      setMoveTargetIndex(index);
      console.log(`Move target set to index: ${index}`);
    } else {
      setSelectedChannels(prevSelected => {
        if (prevSelected.includes(channelId)) {
          return prevSelected.filter(id => id !== channelId);
        } else {
          return [...prevSelected, channelId];
        }
      });
    }
  }, [isMoveModeActive, setMoveTargetIndex, setSelectedChannels]);

  const handleInitiateMove = useCallback(() => {
    if (selectedChannels.length === 0) {
      openModal({ message: 'Пожалуйста, выберите каналы для перемещения.' });
      return;
    }
    setIsMoveModeActive(true);
    setMoveTargetIndex(null);
    openModal({ message: 'Режим перемещения активен. Кликните на место в списке, куда хотите переместить каналы, затем нажмите Enter.'});
  }, [selectedChannels, setIsMoveModeActive, setMoveTargetIndex, openModal]);

  const handleConfirmMove = useCallback(() => {
    if (!isMoveModeActive || moveTargetIndex === null || selectedChannels.length === 0) return;

    const channelsToMove = channels.filter(ch => selectedChannels.includes(ch.id));
    const remainingChannels = channels.filter(ch => !selectedChannels.includes(ch.id));

    const actualTargetIndex = Math.min(moveTargetIndex, remainingChannels.length);

    const newChannels = [
      ...remainingChannels.slice(0, actualTargetIndex),
      ...channelsToMove,
      ...remainingChannels.slice(actualTargetIndex)
    ];

    setChannels(newChannels);
    setSelectedChannels([]);
    setIsMoveModeActive(false);
    setMoveTargetIndex(null);
    console.log('Channels moved!');
  }, [isMoveModeActive, moveTargetIndex, selectedChannels, channels, setChannels, setSelectedChannels, setIsMoveModeActive, setMoveTargetIndex]);

  const handleInitiateToggleLock = useCallback(() => {
    if (selectedChannels.length === 0) {
      openModal({
        message: 'Пожалуйста, выберите каналы для изменения статуса блокировки.',
        title: 'Предупреждение'
      });
      return;
    }

    const anySelectedLocked = selectedChannels.some(id => 
      channels.find(ch => ch.id === id)?.locked
    );

    const performToggleLock = () => {
      setChannels(prevChannels =>
        prevChannels.map(channel =>
          selectedChannels.includes(channel.id)
            ? { ...channel, locked: !channel.locked }
            : channel
        )
      );
      setSelectedChannels([]);
      openModal({ message: 'Статус блокировки каналов успешно изменен.' });
    };

    if (anySelectedLocked) {
      // Trying to unlock at least one channel, ask for password
      openModal({
        title: 'Разблокировка каналов',
        message: 'Для изменения статуса блокировки введите пароль:',
        showPasswordInput: true,
        passwordLabel: 'Пароль администратора',
        okText: 'Подтвердить',
        cancelText: 'Отмена',
        // The onConfirm prop in CustomModal becomes the submission handler when showPasswordInput is true
        // The actual password submission is handled by CustomModal's internal confirm button logic which calls onPasswordSubmit prop.
        onPasswordSubmit: (enteredPassword) => {
          if (enteredPassword === HARDCODED_PASSWORD) {
            closeModal(); // Close the password modal first
            performToggleLock(); // Then perform the action
          } else {
            closeModal(); // Close previous modal before showing error
            openModal({
              title: 'Ошибка',
              message: 'Неверный пароль!',
              okText: 'Попробовать снова'
              // No confirm action needed for this error message, just OK to dismiss
            });
          }
        },
        // We don't need a separate onConfirm here if onPasswordSubmit is the primary action path for this modal type
      });
    } else {
      // All selected channels are unlocked, so we are locking them (no password needed)
      openModal({
        message: `Вы уверены, что хотите заблокировать выбранные каналы (${selectedChannels.length} шт.)?`,
        title: 'Подтверждение блокировки',
        showConfirmButtons: true,
        onConfirm: performToggleLock, // Standard confirm action
      });
    }
  }, [selectedChannels, openModal, closeModal, channels, setChannels, setSelectedChannels]);

  const handleExit = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (currentModalProps.isOpen && (event.key === 'Escape' || event.key === 'Enter')) {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'Enter') {
            // If it's a password modal, Enter key is handled by TextField's onKeyPress in CustomModal to call onPasswordSubmit
            // If it's a confirm modal, Enter key should trigger confirm action
            // If it's a simple info modal, Enter key should close (OK action)
            if (currentModalProps.showPasswordInput) {
                // Already handled by TextField's onKeyPress if modal is open, but good to have a fallback or be explicit
                // The onPasswordSubmit will be triggered by CustomModal's confirm button itself.
            } else if (currentModalProps.showConfirmButtons && currentModalProps.onConfirm) {
                currentModalProps.onConfirm();
                // closeModal(); // onConfirm in CustomModal might already close, or performToggleLock shows another modal
            } else if (!currentModalProps.showConfirmButtons && !currentModalProps.showPasswordInput) {
                closeModal();
            }
        }
        return; // Stop further key processing
      }

      if (event.key === 'Escape' || event.key === 'Backspace') {
        if (isMoveModeActive) {
          setIsMoveModeActive(false);
          setMoveTargetIndex(null);
          openModal({ message: 'Перемещение отменено.'});
        } else {
          handleOptionsClose();
        }
      } else if (event.key === 'Enter' && isMoveModeActive) {
        handleConfirmMove();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMoveModeActive, handleOptionsClose, handleConfirmMove, setMoveTargetIndex, setIsMoveModeActive, currentModalProps, closeModal, openModal]); // Added currentModalProps as a whole

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000033 0%, #000066 100%)',
      color: 'white',
      position: 'relative',
      p: 2,
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <Box sx={{ 
          width: 24, 
          height: 24, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#333',
        }}>
          <Typography variant="caption">TV</Typography>
        </Box>
        <Typography>Редактор каналов</Typography>
      </Box>

      {/* Group Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
        <Box sx={{ 
          width: 20, 
          height: 20, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#333',
        }}>
          <Typography variant="caption" sx={{ color: 'orange' }}>TV</Typography>
        </Box>
        <Typography sx={{ color: 'orange' }}>Груп«Все спутники»</Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        {/* Channel List */}
        <Box sx={{ flex: 4, position: 'relative' }}>
          <Typography sx={{ 
            color: '#FFD700',
            textAlign: 'center',
            mb: 1,
            textTransform: 'uppercase',
          }}>
            Список каналов
          </Typography>

          {/* Options Menu */}
          <Menu
            anchorEl={optionsAnchorEl}
            open={Boolean(optionsAnchorEl)}
            onClose={handleOptionsClose}
            PaperProps={{
              sx: {
                bgcolor: 'rgba(0, 0, 0, 0.9)',
                border: '1px solid #FFD700',
                minWidth: '200px',
                '& .MuiMenuItem-root': {
                  color: 'white',
                  fontSize: '0.9rem',
                  py: 1,
                  '&:hover': {
                    bgcolor: 'rgba(0, 102, 204, 0.3)',
                  },
                },
              },
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box sx={{ 
              bgcolor: '#333',
              py: 1,
              px: 2,
              borderBottom: '1px solid #444',
            }}>
              <Typography sx={{ color: '#FFD700' }}>Опции</Typography>
            </Box>
            <MenuItem onClick={handleSelectAll}>Выбрать все</MenuItem>
            <MenuItem onClick={handleDeselectAll}>Отменить выбор</MenuItem>
            <MenuItem onClick={() => handleOptionSelect('selectOther')}>Выбрать др.</MenuItem>
            <MenuItem onClick={() => handleOptionSelect('selectTP')}>Выбрать ТП</MenuItem>
          </Menu>

          <Box sx={{
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            height: '60vh',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#0066cc',
              borderRadius: '3px',
            },
          }}>
            {channels.map((channel, index) => (
              <Box
                key={channel.id}
                onClick={() => handleChannelClick(channel.id, index)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  cursor: 'pointer',
                  bgcolor: selectedChannels.includes(channel.id)
                    ? 'rgba(0, 102, 204, 0.5)'
                    : isMoveModeActive && moveTargetIndex === index
                      ? 'rgba(255, 215, 0, 0.4)'
                      : 'transparent',
                  border: isMoveModeActive && moveTargetIndex === index 
                    ? '1px dashed #FFD700' 
                    : selectedChannels.includes(channel.id) 
                      ? '1px solid rgba(0, 102, 204, 0.7)' 
                      : '1px solid transparent',
                  transition: 'background-color 0.2s, border 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(0, 102, 204, 0.2)',
                  }
                }}
              >
                <Typography sx={{ width: 60 }}>{channel.id}</Typography>
                {channel.locked && <Lock sx={{ fontSize: 16, color: '#FFD700', mr: 0.5 }} />}
                <Typography sx={{ flex: 1 }}>{channel.name}</Typography>
                <Typography sx={{ mx: 2 }}>$</Typography>
                {channel.hd && (
                  <Box sx={{ 
                    bgcolor: '#333',
                    px: 1,
                    borderRadius: 0.5,
                    fontSize: '0.8rem',
                  }}>
                    HD
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Operations List */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: '#FFD700', textAlign: 'center', mb: 1, textTransform: 'uppercase' }}>Список операций</Typography>
          <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', minWidth: '120px'}}>
            <IconButton sx={{ color: isMoveModeActive ? '#FFD700' : 'white', width: '48px', height: '48px' }} onClick={handleInitiateMove}>
              <Sync sx={{ fontSize: 32 }} />
            </IconButton>
            <IconButton sx={{ color: 'white', width: '48px', height: '48px' }} onClick={handleInitiateToggleLock}>
              <LockOpen sx={{ fontSize: 32 }} />
            </IconButton>
            <IconButton sx={{ color: 'white', width: '48px', height: '48px' }}><Close sx={{ fontSize: 32 }} /></IconButton>
            <IconButton sx={{ color: 'white', width: '48px', height: '48px' }}><Edit sx={{ fontSize: 32 }} /></IconButton>
            <IconButton sx={{ color: 'white', width: '48px', height: '48px' }}><ArrowForward sx={{ fontSize: 32 }} /></IconButton>
          </Box>
        </Box> 
      </Box>

      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0, 0, 0, 0.95)', py: 1, px: 2}}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 2, alignItems: 'center'}}>
          {/* First Row */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <Box sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: '#ff0000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Box sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#fff' }}>F1</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#fff' }}>Группа</Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <Box 
              onClick={handleOptionsClick}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#00aa00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Box sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                border: '2px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#fff' }}>F2</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#fff' }}>Опции</Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <Box sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: '#444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Search sx={{ fontSize: 20, color: '#fff' }} />
            </Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#fff' }}>Найти</Typography>
          </Box>

          {/* Exit button in bottom navigation */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <Box 
              onClick={handleExit}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem', color: '#fff' }}>Exit</Typography>
            </Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#fff' }}>Выход</Typography>
          </Box>

          {/* Second Row */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <Box 
              onClick={closeModal}
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ArrowBack sx={{ fontSize: 20, color: '#fff' }} />
            </Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#fff' }}>Выбор</Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <Box sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: '#444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <RadioButtonChecked sx={{ fontSize: 20, color: '#fff' }} />
            </Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#fff' }}>Страница</Typography>
          </Box>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
            <Box sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: '#444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Edit sx={{ fontSize: 20, color: '#fff' }} />
            </Box>
            <Typography sx={{ fontSize: '0.9rem', color: '#fff' }}>Изменить</Typography>
          </Box>
        </Box>
      </Box>

      <CustomModal 
        isOpen={currentModalProps.isOpen} 
        message={currentModalProps.message} 
        title={currentModalProps.title}
        showConfirmButtons={currentModalProps.showConfirmButtons}
        onConfirm={currentModalProps.onConfirm}
        confirmText={currentModalProps.confirmText}
        cancelText={currentModalProps.cancelText}
        okText={currentModalProps.okText}
        onClose={closeModal} 
        showPasswordInput={currentModalProps.showPasswordInput}
        passwordLabel={currentModalProps.passwordLabel}
        onPasswordSubmit={currentModalProps.onPasswordSubmit}
      />
    </Box>
  );
}

export default ChannelList; 