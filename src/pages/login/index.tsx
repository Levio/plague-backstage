import React, { useState } from 'react';

import LoginForm from './components/LoginForm';
import { connect } from 'dva';

import styles from './index.less';
import { LoginParamsType } from '@/services/login';

const { Submit, UserName, Password } = LoginForm;

interface LoginProps {}

const Login: React.FC<LoginProps> = props => {
  const [type, setType] = useState<string>('account');

  const onSubmit = async (values: LoginParamsType) => {
    console.log(values);
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={onSubmit}>
        {/* <Tab key="account" tab="账号密码登录">
          <UserName name="username"></UserName>
          <Password name="password"></Password>
        </Tab>
        <Tab key="phone" tab="手机号码登录">
          <div>敬请期待</div>
        </Tab> */}
        <UserName name="username"></UserName>
        <Password name="password"></Password>

        <Submit>登录</Submit>
      </LoginForm>
    </div>
  );
};

// export default connect(({login, loading}) => ({}))(Login);

export default Login;
