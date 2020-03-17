import { Effect } from 'dva';
import { Reducer } from 'redux';

export interface UserStateType {
  name: string;
  avatar: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserStateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveUser: Reducer<UserStateType>;
  };
}

const userModel: UserModelType = {
  namespace: 'user',
  state: {
    name: '',
    avatar: '',
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      //
    },
  },
  reducers: {
    saveUser(state, { payload }) {
      return {
        ...state,
        name: payload.name,
        avatar: payload.avatar,
      };
    },
  },
};

export default userModel;
