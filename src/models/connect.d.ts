import { AnyAction } from 'redux';
import { LoginStateType } from './login';
import { UserModelType, UserStateType } from './user';
import { RouterTypes, Route } from 'umi';

export interface Loading {
  effects: { [key: string]: boolean | undefined };
  models: {
    login?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  login: LoginStateType;
  loading: Loading;
  user: UserStateType;
}

export interface ConnectProps<T = {}> extends Partial<RouterTypes<{ routers: Route[] }, T>> {
  dispatch: Dispatch<AnyAction>;
}
