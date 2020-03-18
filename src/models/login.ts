import { Effect } from 'dva';
import { Reducer } from 'redux';

import { router } from 'umi';
import { login } from '@/services/login';

export interface LoginStateType {
  status?: 'ok' | 'error';
}

export interface LoginModelType {
  namespace: string;
  state: LoginStateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<LoginStateType>;
  };
}

const loginModel: LoginModelType = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response.code === '200' && response.data) {
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        });
        yield put({
          type: 'user/saveUser',
          payload: response.data.user || {},
        });
        if (response.data.status === 'ok') {
          router.replace('/');
        }
      }
    },
    *logout({ payload }, { call, put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: undefined,
        },
      });
      router.push('/login');
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        currentAuthority: payload.currentAuthority,
      };
    },
  },
};

export default loginModel;
