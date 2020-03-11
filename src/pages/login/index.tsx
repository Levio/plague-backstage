import React from 'react';

import LoginForm from './components/LoginForm';

import styles from './index.less';

interface LoginProps {}

const Login: React.FC<LoginProps> = props => {
  return (
    <div className={styles.main}>
      <LoginForm>
        <div></div>
      </LoginForm>
    </div>
  );
};

export default Login;
