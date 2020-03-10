import React, { ReactElement, ReactNode } from 'react';
import { Layout, Avatar, Icon } from 'antd';

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
      <Icon type="poweroff" className={styles['poweroff-icon']}></Icon>
    </Header>
  );
};

export default BasicHeader;
