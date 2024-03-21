import React from 'react';

interface AuthLayoutProps {
  children: JSX.Element; // Use JSX.Element for child type
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <h1>Login or Register</h1>
      {children}
    </div>
  );
};

export default AuthLayout;