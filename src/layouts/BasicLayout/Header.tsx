import { PoweroffOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Layout, Avatar, Modal } from 'antd';
import styles from './index.less';
import { ConnectProps, ConnectState } from '@/models/connect';
import { UserStateType } from '@/models/user';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';

interface BasicHeaderProps extends ConnectProps {
  userInfo: UserStateType;
  dispatch: Dispatch<AnyAction>;
}

const { Header } = Layout;

const BasicHeader: React.FC<BasicHeaderProps> = props => {
  const { userInfo } = props;

  const onLogout = () => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确认退出系统吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        const { dispatch } = props;
        dispatch({
          type: 'login/logout',
        });
      },
    });
  };

  return (
    <Header className={styles.header}>
      <Avatar
        style={{
          backgroundColor: '#f56a00',
          verticalAlign: 'middle',
          fontSize: 16,
        }}
      >
        {userInfo.name ? userInfo.name.slice(0, 1).toUpperCase() : '游'}
      </Avatar>
      <div className={styles.username}>{userInfo.name || '游客'}</div>
      <PoweroffOutlined className={styles['poweroff-icon']} onClick={onLogout} />
    </Header>
  );
};

export default connect(({ user }: ConnectState) => ({
  userInfo: user,
}))(BasicHeader);
