import React from 'react';
import { UserOutlined, LockTwoTone } from '@ant-design/icons';
import styles from './index.less';
export default {
  UserName: {
    props: {
      placeholder: '请输入您的用户名',
      prefix: (
        <UserOutlined
          style={{
            color: '#1890ff',
          }}
          className={styles.prefixIcon}
        />
      ),
    },
    rules: [
      {
        required: true,
        message: '请先输入您的用户名！',
      },
    ],
  },
  Password: {
    props: {
      type: 'password',
      placeholder: '请输入您的密码',
      prefix: <LockTwoTone className={styles.prefixIcon} />,
    },
    rules: [
      {
        required: true,
        message: '请输入您的账户密码！',
      },
    ],
  },
};
