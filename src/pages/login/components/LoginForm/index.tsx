import React from 'react';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = props => {
  return <div>{props.children}</div>;
};

export default LoginForm;
