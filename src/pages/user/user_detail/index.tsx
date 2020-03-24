import React from 'react';
import { RouterTypes } from 'umi';

import styles from './index.less';
import BaseInfo from './BaseInfo';

interface matchParamsType {
  id: string | number;
}

interface UserDetailProps extends Partial<RouterTypes<{}, matchParamsType>> {}

const UserDetail: React.FC<UserDetailProps> = props => {
  const { computedMatch } = props;
  const userId = computedMatch && computedMatch.params.id;

  return (
    <div className={styles.container}>
      <div>user: {userId} detail</div>
      <BaseInfo id={userId || ''}></BaseInfo>
    </div>
  );
};

export default UserDetail;
