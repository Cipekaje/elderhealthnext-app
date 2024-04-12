const registerErrorType = {
    email: undefined,
    name: undefined,
    password: undefined,
  };
  
  const LoginPayloadType = {
    email: '',
    password: '',
  };
  
  const LoginErrorType = {
    email: undefined,
    password: undefined,
  };
  
  // Auth Input type
  const AuthInputType = {
    label: '',
    type: '',
    name: '',
    errors: { ...registerErrorType },
    callback: (name, value) => {},
  };
  
  // Forgot password payload type
  const ForgotPasswordPayload = {
    email: '',
  };
  
  // Reset password type
  const ResetPasswordPayload = {
    email: '',
    signature: '',
    password: '',
    password_confirmation: '',
  };
  
  // Magic link payload type
  const MagicLinkPayload = {
    email: '',
  };
  
  const MagicLinkPayloadVerify = {
    email: '',
    token: '',
  };
  