import React, { useState } from 'react';
import Input from './Input';

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    if (!user.username || !user.email || !user.password || !user.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log(user);

    if (user) {
      const response = await fetch('/api/auth/register', {
        method: "POST",
        body: JSON.stringify(user)
      });
      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    }
    setError(null);
    setUser({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <Input label="Username:" type="text" name="username" value={user.username}  onChange={handleChange} required />
      <Input label="Email:" type="email" name="email" value={user.email}  onChange={handleChange} required />
      <Input label="Password:" type="password" name="password" value={user.password}  onChange={handleChange} required />
      <Input label="Confirm Password:" type="password" name="confirmPassword" value={user.confirmPassword}  onChange={handleChange} required />
      {error && <p className="error">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
