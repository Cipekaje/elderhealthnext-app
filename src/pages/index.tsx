import React, { useState } from 'react';
import Login from '@/components/LoginForm';
import Register from '@/components/RegisterForm';
import AuthLayout from '@/layouts/AuthLayout';

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false); // New state for register toggle
  
    // Login status check logic (replace with your implementation) 
  
    const handleRegisterToggle = () => setShowRegister(!showRegister); // Toggle register form
  
    return (
        <div className="container">
          {!isLoggedIn && (
            <AuthLayout>
              {showRegister ? (
                <>
                  
                  <Register />

                </>
              ) : (
                <>
                  <h2>Login</h2>
                  <Login onLoginSuccess={() => setIsLoggedIn(true)} />
                  <p>
                    Don't have an account?{' '}
                    <button onClick={handleRegisterToggle}>Register</button>
                  </p>
                </>
              )}
            </AuthLayout>
          )}
          {isLoggedIn && ( // Logged-in content
            <div>
              <p>This is the content you see after logging in.</p>
            </div>
          )}
        </div>
    );
}
