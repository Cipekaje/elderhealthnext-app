import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
}

function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(email);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Siųsti
          </Button>
        </Box>
      </form>
    </Box>
  );
}
export default ForgotPasswordForm;
