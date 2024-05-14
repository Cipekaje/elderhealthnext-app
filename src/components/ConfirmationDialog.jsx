import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// ==============================|| CONFIRMATION DIALOG ||============================== //
const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || 'Confirm'}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{message || 'Ar tikrai norite priskirti šį pacientą sau?'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Atšaukti
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Patvirtinti
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;