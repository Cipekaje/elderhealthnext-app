import React from 'react';

interface InputWrapProps {
  children: React.ReactNode;
}

const InputWrap: React.FC<InputWrapProps> = ({ children }) => {
  return (
    <div className="input-wrap">
      {children}
    </div>
  );
};

export default InputWrap;
