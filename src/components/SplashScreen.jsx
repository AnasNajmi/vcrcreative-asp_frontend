import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Logo from '../assets/images/LOGO.svg';

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 80;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '35%',
          alignItems: 'center',
        }}
      >
        <img
          style={{ width: '300px', position: 'absolute', top: '25%' }}
          src={Logo}
          alt=""
        />
        <Box sx={{ width: '100%' }}>
          <LinearProgress
            sx={{
              '& .MuiLinearProgress-barColorPrimary': {
                backgroundColor: '#f6fafb',
              },
            }}
            variant="determinate"
            value={progress}
          />
        </Box>
      </div>
    </div>
  );
}
