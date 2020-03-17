import React, { useState } from 'react';

import LoginForm from './components/LoginForm';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';

import styles from './index.less';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { LoginStateType } from '@/models/login';
import { Alert } from 'antd';

const { Submit, UserName, Password } = LoginForm;

interface LoginProps {
  userLogin: LoginStateType;
  submitting?: boolean;
  dispatch: Dispatch<AnyAction>;
}

const LoginMessage: React.FC<{ content: string }> = ({ content }) => {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon></Alert>;
};

const Login: React.FC<LoginProps> = props => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [type, setType] = useState<string>('account');

  const onSubmit = async (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: values,
    });
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
        {status === 'error' ? <LoginMessage content="账号或密码错误"></LoginMessage> : null}
        <UserName name="username"></UserName>
        <Password name="password"></Password>

        <Submit loading={submitting}>登录</Submit>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

// export default Login;
