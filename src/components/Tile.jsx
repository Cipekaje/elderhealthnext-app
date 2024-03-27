import React from 'react';
import { Box, Typography } from '@mui/material';

const Tile = ({ title, content, color, size }) => {
  return (
    <Box
      sx={{
        backgroundColor: color || 'white',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '20px',
        width: size === 'large' ? 'calc(50% - 10px)' : 'calc(25% - 10px)',
        display: 'inline-block',
        verticalAlign: 'top',
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography>{content}</Typography>
    </Box>
  );
};

export default Tile;