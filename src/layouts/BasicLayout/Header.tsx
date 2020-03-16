import { PoweroffOutlined } from '@ant-design/icons';
import React from 'react';
import { Layout, Avatar } from 'antd';

const { Header } = Layout;

import styles from './index.less';

const BasicHeader: React.FC = props => {
  return (
    <Header className={styles.header}>
      <Avatar
        style={{
          backgroundColor: '#f56a00',
          verticalAlign: 'middle',
          fontSize: 16,
          marginRight: 20,
        }}
      >
        U
      </Avatar>
      <PoweroffOutlined className={styles['poweroff-icon']} />
    </Header>
  );
};

export default BasicHeader;
