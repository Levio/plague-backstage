import React, { useState } from 'react';

import LoginForm from './components/LoginForm';

import styles from './index.less';

const { Tab, Submit } = LoginForm;

interface LoginProps {}

const Login: React.FC<LoginProps> = props => {
  const [type, setType] = useState<string>('account');
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType}>
        <Tab key="account" tab="账号密码登录">
          <div>2222</div>
        </Tab>
        <Tab key="phone" tab="手机号码登录">
          <div>333</div>
        </Tab>
        <div>111</div>
        <Submit>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default Login;
