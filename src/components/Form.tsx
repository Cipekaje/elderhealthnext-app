import React from 'react';

interface FormProps {
  children: React.ReactNode;
  // Add any additional props you want to pass to the form (e.g., onSubmit handler)
}

const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return (
    <form className="form" {...props}>
      {children}
    </form>
  );
};

export default Form;