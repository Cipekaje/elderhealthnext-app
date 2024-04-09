import { Button, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { IconLogout } from '@tabler/icons-react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export const MuiDialog = () => {
    const { data: session, status: authenticated } = useSession();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    // Logout function
    const handleOpen = () => {
        setOpen(true);
    };

    // Close dialog function
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = async () => {
        try {
          await signOut({ redirect: true, callbackUrl: '/' });
        } catch (error) {
          console.error('error:', error);
        }
      };
    return (
        <>
            {/* List item button triggering dialog open */}
            <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                    <IconLogout stroke={1.5} size="1.3rem" />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">Atsijungti</Typography>} />
            </ListItemButton>

            {/* Dialog component */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
            >
                <DialogTitle id='dialog-title'>Ar tikrai norite atsijungti?</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        Paspaudus "Atsijungti", jūs būsite išjungti iš sistemos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Atšaukti
                    </Button>
                    <Button autoFocus onClick={handleLogout}>
                        Atsijungti
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
