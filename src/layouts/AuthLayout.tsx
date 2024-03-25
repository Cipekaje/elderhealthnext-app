import React from 'react';

interface AuthLayoutProps {
  children: JSX.Element; // Use JSX.Element for child type
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      
      {children}
    </div>
  );
};

export default AuthLayout;