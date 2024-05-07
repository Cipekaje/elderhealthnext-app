import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import Image from 'next/image';
import emblemIcon from '../../public/Logo.png';
import { Container, Typography, Box, TextField, Button, Grid } from '@mui/material';

export default function SupervisorLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    
    // const { userID, emailTEST } = router.query;
    const { userID } = router.query;
    // const decodedEmail = emailTEST ? decodeURIComponent(emailTEST) : '';
    console.log("user ID LOGIN DALYJE", userID);
    console.log("user email LOGIN DALYJE", email);
    const data = { email, userID };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Perform client-side validation
        if (!email || !password) {
            setError('Užpildykite visus laukus');
            return;
        }

        // Call NextAuth signIn function
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        console.log("loginEmail", email);
        // Check if authentication was successful
        if (result?.error) {
            console.log("Authentication error:", result?.error);
            setError('Neteisingi prisijungimo duomenys');
        }
        else {
            try {
                const response = await fetch('/api/supervisor/userSupervisor', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data), // Convert data to JSON format
                });
                router.push('/SupervisorDashboard');
                // if (response.ok) {
                //   router.push('/loginSupervisor');
                // } else {
                //   const errorData = await response.json();
                //   setError(errorData.message || 'Registracija nesėkminga!');
                // }

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
                    </form>
                </Box>
            </Container>
        </div>
    );

}
