import { Effect } from 'dva';
import { Reducer } from 'redux';
import { LOCAL_USERINFO_KEY } from '@/config/const';
import { fetchUserInfo } from '@/services/user';
import { router } from 'umi';

export interface UserStateType {
  name?: string;
  avatar?: string;
  currentAuthority?: 'admin' | 'user' | 'guest';
}

export interface UserModelType {
  namespace: 'user';
  state: UserStateType;
  effects: {
    fetch: Effect;
    updateFetch: Effect;
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
    currentAuthority: undefined,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchUserInfo, payload);
      if (response.code === '200' && response.data) {
        yield put({
          type: 'saveUser',
          payload: response.data,
        });
      } else {
        router.push('/login');
      }
    },
    *updateFetch({ payload }, { call, put }) {
      yield put({
        type: 'saveUser',
        payload,
      });
      // 刷新时从服务器更新用户信息
      yield put({
        type: 'fetch',
        payload: { id: payload.id },
      });
    },
  },
  reducers: {
    saveUser(state, { payload }) {
      localStorage.setItem(LOCAL_USERINFO_KEY, JSON.stringify(payload));
      return {
        ...state,
        id: payload.id,
        name: payload.name,
        avatar: payload.avatar,
        currentAuthority: payload.authority,
      };
    },
  },
};

export default userModel;
