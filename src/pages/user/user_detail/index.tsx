import React from 'react';
import { RouterTypes } from 'umi';

interface matchParamsType {
  id: string | number;
}

interface UserDetailProps extends Partial<RouterTypes<{}, matchParamsType>> {}

const UserDetail: React.FC<UserDetailProps> = props => {
  const { computedMatch } = props;
  const userId = computedMatch && computedMatch.params.id;
  return <div>user: {userId} detail</div>;
};

export default UserDetail;
