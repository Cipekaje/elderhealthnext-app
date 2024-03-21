import React from 'react';

interface SubmitButtonProps {
  type?: 'submit' | 'reset' | 'button'; // Allowed types for the button
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type = 'submit', children }) => {
  return (
    <button type={type} className="submit-button">
      {children}
    </button>
  );
};

export default SubmitButton;
