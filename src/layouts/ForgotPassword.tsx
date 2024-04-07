import React from 'react';

interface ForgotPasswordLayoutProps {
  children: React.ReactNode;
}

const ForgotPasswordLayout = ({ children }: ForgotPasswordLayoutProps) => {
  return (
    <div className="forgot-password-layout">
      {children}
    </div>
  );
};

export default ForgotPasswordLayout;