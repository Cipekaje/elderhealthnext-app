import React, { useState, FormEvent } from 'react';
import { Grid, Paper, Typography, TextField, Button, Alert, Box } from '@mui/material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const AccountSettings = () => {
  // State for password change form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  // State for other user data form
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [disease, setDisease] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdateSubmitting, setIsUpdateSubmitting] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const userId = user?.id || '';

  const validatePassword = async () => {
    const newErrors = {};

    if (newPassword.length < 8) {
      newErrors.newPassword = 'Slaptažodis turi būti bent 8 simbolių';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Slaptažodžiai turi sutapti';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (isPasswordSubmitting) return;
    setIsPasswordSubmitting(true);

    if (await validatePassword()) {
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword, newPassword, userId }),
        });

        if (response.ok) {
          setPasswordSuccess(true);
          setPasswordError(null);
        } else {
          const data = await response.json();
          setPasswordError(data.message);
          setPasswordSuccess(false);
        }
      } catch (err) {
        setPasswordError("Įvyko klaida. Bandykite vėliau.");
        setPasswordSuccess(false);
      } finally {
        setIsPasswordSubmitting(false);
      }
    } else {
      setPasswordSuccess(false);
      setIsPasswordSubmitting(false);
    }
  };

  const handleUserDataSubmit = async (e) => {
    e.preventDefault();
  
    if (isUpdateSubmitting) return;
    setIsUpdateSubmitting(true);
  
    try {
      console.log('Sending request to update user data:', { userId, height, weight, disease }); // Add this line
      const response = await fetch('/api/auth/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, height, weight, disease }),
      });
  
      console.log('Response from server:', response); // Add this line
  
      if (response.ok) {
        setUpdateSuccess(true);
        setUpdateError(null);
      } else {
        const data = await response.json();
        setUpdateError(data.message);
        setUpdateSuccess(false);
      }
    } catch (err) {
      console.error('Error updating user data:', err); // Add this line
      setUpdateError("Įvyko klaida. Bandykite vėliau.");
      setUpdateSuccess(false);
    } finally {
      setIsUpdateSubmitting(false);
    }
  };
  
  const handleBackButton = () => {
    router.back();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={26} height={26} />
        <Typography variant="h5">ElderHealth Companion</Typography>
      </Box> */} 
      <Typography variant="h5" marginTop={1} marginBottom={1}>ElderHealth Companion</Typography>
      <Paper elevation={3} sx={{ padding: '20px', maxWidth: 500, marginBottom: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          Paskyros nustatymai
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">Pakeisti slaptažodį</Typography>
            {passwordSuccess && <Alert severity="success">Slaptažodis pakeistas sėkmingai!</Alert>}
            {passwordError && <Alert severity="error">{passwordError}</Alert>}
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                label="Dabartinis slaptažodis"
                type="password"
                value={currentPassword}
                fullWidth
                margin="normal"
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword}
              />
              <TextField
                label="Naujas slaptažodis"
                type="password"
                value={newPassword}
                fullWidth
                margin="normal"
                onChange={(e) => setNewPassword(e.target.value)}
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword}
              />
              <TextField
                label="Patvirtinkite naują slaptažodį"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
                error={!!passwordErrors.confirmPassword}
                helperText={passwordErrors.confirmPassword}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Pakeisti slaptažodį
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ padding: '20px', maxWidth: 500 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
          Keisti kitus duomenis
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {updateSuccess && <Alert severity="success">Duomenys atnaujinti sėkmingai!</Alert>}
            {updateError && <Alert severity="error">{updateError}</Alert>}
            <form onSubmit={handleUserDataSubmit}>
              <TextField
                label="Ūgis (cm)"
                type="number"
                value={height}
                fullWidth
                margin="normal"
                onChange={(e) => setHeight(e.target.value)}
              />
              <TextField
                label="Svoris (kg)"
                type="number"
                value={weight}
                fullWidth
                margin="normal"
                onChange={(e) => setWeight(e.target.value)}
              />
              <TextField
                label="Ligos"
                type="text"
                value={disease}
                fullWidth
                margin="normal"
                onChange={(e) => setDisease(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Atnaujinti duomenis
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="body2" style={{ cursor: 'pointer', color: 'blue', marginTop: '20px' }} onClick={handleBackButton}>
        Grįžti atgal
      </Typography>
    </Box>
  );
};

export default AccountSettings;
