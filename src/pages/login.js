import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { Container, Typography, Box, TextField, Button, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleForgotPasswordClick = () => {
    router.push('/ForgotPassword');
  };

  const handleRegisterClick = () => {
    router.push('/Register');
  };

  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Call NextAuth signIn function
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    const data = { email };
    if (result?.error) {
      setError('Neteisingi prisijungimo duomenys');
    }
    else {
      try {
        const response = await fetch('/api/supervisor/getSupervisor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), 
        });
        const responseData = await response.json();
        // console.log("is API ka gavome", responseData);

        if (response.ok) {
          const { status, role } = responseData;

          if (status === 200) {
            if (role === 'supervisor') {
              router.push('/SupervisorDashboard');
            }
            else if (role === 'doctor'){
              router.push("/DoctorDashboard");
            }
            else {
              router.push('/UserDashboard');
            }
          }
        }

      } catch (error) { console.error('Error:', error); }
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Image src={emblemIcon} alt="ElderHealth Companion Emblem" width={26} height={26} />
            <Typography variant="h5" component="span" ml={1}>
              ElderHealth Companion
            </Typography>
          </Box>
          <Typography component="h1" variant="h6">
            Prisijungti
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="El. Paštas"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Slaptažodis"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Render error message if error state is set */}
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Prisijungti
            </Button>
            <Typography variant="contained" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
              Arba naudokite kitą prisijungimo būdą
            </Typography>

            <GoogleSignInButton>
              Prisijungti naudojant Google
            </GoogleSignInButton>

            <Grid container>
              <Grid item xs>
                <Typography variant="body2" style={{ cursor: 'pointer', color: 'rgba(40, 67, 135, 1)' }} onClick={handleForgotPasswordClick}>
                  Pamiršote slaptažodį?
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }} onClick={handleRegisterClick}>
                  Neturite paskyros? <strong style={{ color: 'rgba(40, 67, 135,1)' }}>Susikurkite</strong>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );

}
