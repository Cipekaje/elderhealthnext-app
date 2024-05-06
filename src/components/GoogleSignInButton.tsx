import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google'; // Correctly import the Google icon
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => signIn('google', { callbackUrl: 'http://localhost:3000/UserDashboard' });

  return (
    <Button
    onClick={loginWithGoogle}
    variant="contained" // Same variant as the example
    startIcon={<GoogleIcon />} // Google icon at the start
    fullWidth // Ensures it stretches across the container
    sx={{
      backgroundColor: '#4285F4', // Google's blue color
      color: 'white',
      textTransform: 'none',
      fontSize: '16px', // Matching font size
      padding: '10px', // Matching padding
      mt: 3, // Matching top margin
      mb: 2, // Matching bottom margin
      '&:hover': {
        backgroundColor: '#3367D6', // Darken on hover
      },
    }}
    >
      {children || 'Prisijungti naudojant Google'}
    </Button>
  );
};

export default GoogleSignInButton;
