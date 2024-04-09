import React, { useState } from 'react';
// import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm'; // Assuming RegisterForm exists
import MainHomeLayout from '@/layouts/MainHomeLayout';

export default function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false); // New state for register toggle
  
    return (
      <div className="container">
        <MainHomeLayout children={undefined} />
      </div>
    );
}
