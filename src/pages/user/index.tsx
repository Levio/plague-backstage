import React from 'react';
import FilterForm from '@/components/FilterForm';

import styles from './index.less';

const User: React.FC = props => {
  return (
    <div className={styles.container}>
      <div>
        <FilterForm></FilterForm>
      </div>
    </div>
  );
};

export default User;
