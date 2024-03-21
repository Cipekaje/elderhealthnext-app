import React, { useState } from 'react';
import Input from './Input'; // Import Input component
import { signIn } from 'next-auth/react';

interface User {
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

function Login() {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    try {
      // Perform login using NextAuth.js
      await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        email: user.email,
        password: user.password,
      });

      // Redirect after successful login (adjust route as needed)
      window.location.href = '/register';
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      setError(errorResponse.message);
    } finally {
      // Clear user input fields even on error
      setUser({ email: '', password: '' });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        label="Email:"
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password:"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;