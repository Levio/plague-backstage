import React from 'react';

import styles from './index.less';

const LoginLayout: React.FC = props => {
  return (
    <div className={styles.container}>
      <div>{props.children}</div>
    </div>
  );
};

export default LoginLayout;
