//Mobile only

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu'; // Import Menu icon
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';


const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the "/Login" page
  };
  const handleHelpClick = () => {
    router.push('/Help'); 
  };


  return (
    <>
      <IconButton
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        style={{ color: 'black' }} // Set color to white
      >
        <MenuIcon style={{ color: 'black' }} /> {/* Render Menu icon with white color */}
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleHelpClick}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Pagalba</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <FeedbackIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Atsiliepimai</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Nustatymai</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLoginClick}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Prisijungti</ListItemText>
        </MenuItem>

      </Menu>
    </>
  );
};

export default DropdownMenu;