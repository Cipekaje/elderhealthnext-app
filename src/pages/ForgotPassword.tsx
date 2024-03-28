import React from 'react';
import ForgotPasswordLayout from '@/layouts/ForgotPassword';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

function ForgotPasswordPage() {
  const handleSubmit = (email: string) => {
    console.log('Submit email:', email);
  };

  return (
    <ForgotPasswordLayout>
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </ForgotPasswordLayout>
  );
}

export default ForgotPasswordPage;