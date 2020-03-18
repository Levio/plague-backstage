import React from 'react';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { ConnectState } from '@/models/connect';
import { UserStateType } from '@/models/user';

interface AuthorizedProps {
  authority?: string[];
  userState?: UserStateType;
  children?: React.ReactNode;
  dispatch: Dispatch<AnyAction>;
}

const Authorized: React.FC<AuthorizedProps> = props => {
  const { authority = [], userState = {} } = props;
  const { currentAuthority } = userState;
  // 此处只判断已登录角色的访问权限
  // 是否登录在layout 中判断
  if (currentAuthority && authority.includes(currentAuthority)) {
    return <>{props.children}</>;
  }
  return <div>抱歉，您暂无权限访问该页面</div>;
};

export default connect(({ user, login }: ConnectState) => ({
  userState: user,
}))(Authorized);
