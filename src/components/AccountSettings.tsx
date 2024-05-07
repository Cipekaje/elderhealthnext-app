import React, { useState, FormEvent } from 'react';
import { Grid, Paper, Typography, TextField, Button, Alert, Box } from '@mui/material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const AccountSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents multiple submissions
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const userId = user?.id || '';

  const validatePassword = async (): Promise<boolean> => {
    const newErrors: FormErrors = {};

    if (newPassword.length < 8) {
      newErrors.newPassword = 'Slaptažodis turi būti bent 8 simbolių';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Slaptažodžiai turi sutapti';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (isSubmitting) return; // Avoid multiple submissions
    setIsSubmitting(true);

    if (await validatePassword()) { // Use await here
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword, newPassword, userId }),
        });

        if (response.ok) {
          setPasswordSuccess(true);
          setError(null);
        } else {
          const data = await response.json();
          setError(data.message);
          setPasswordSuccess(false);
        }
      } catch (err) {
        setError("Įvyko klaida. Bandykite vėliau.");
        setPasswordSuccess(false);
      } finally {
        setIsSubmitting(false); // Reset submission flag
      }
    } else {
      setPasswordSuccess(false);
      setIsSubmitting(false); // Reset submission flag
    }
  };

  const handleBackButton = (): void => {
    router.push('/UserDashboard');
  };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={26} height={26} />
                <Typography variant="h5">ElderHealth Companion</Typography>
            </Box>
            <Paper elevation={3} sx={{ padding: '20px', maxWidth: 500 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
                    Paskyros nustatymai
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Pakeisti slaptažodį</Typography>
                        {passwordSuccess && <Alert severity="success">Slaptažodis pakeistas sėkmingai!</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                        <form onSubmit={handlePasswordSubmit}>
                            <TextField
                                label="Dabartinis slaptažodis"
                                type="password"
                                value={currentPassword}
                                fullWidth
                                margin="normal"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                error={!!errors.currentPassword}
                                helperText={errors.currentPassword}
                            />
                            <TextField
                                label="Naujas slaptažodis"
                                type="password"
                                value={newPassword}
                                fullWidth
                                margin="normal"
                                onChange={(e) => setNewPassword(e.target.value)}
                                error={!!errors.newPassword}
                                helperText={errors.newPassword}
                            />
                            <TextField
                                label="Patvirtinkite naują slaptažodį"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
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

                    <Grid item>
                        <Typography variant="body2" style={{ cursor: 'pointer', color: 'blue' }} onClick={handleBackButton}>
                            Grįžti atgal
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AccountSettings;