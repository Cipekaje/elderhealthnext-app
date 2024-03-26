import React, { useState } from 'react';
// import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm'; // Assuming RegisterForm exists
import MainHomeLayout from '@/layouts/MainHomeLayout';

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false); // New state for register toggle
  
    // You might want to implement login logic here to set `isLoggedIn` state accordingly
  
    const handleRegisterToggle = () => setShowRegister(!showRegister); // Toggle register form
  
    return (
        <div className="container">
          {!isLoggedIn && (



            <MainHomeLayout>
              
            </MainHomeLayout>
          )}
          {isLoggedIn && ( // Logged-in content
            <div>
              <p>This is the content you see after logging in.</p>
            </div>
          )}
        </div>
    );
}
