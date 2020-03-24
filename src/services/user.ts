import request from '@/utils/request';

export interface FetchUserParamsType {
  id: string;
}

export interface FilterUserParamsType {
  name?: string;
  registerTime?: string;
  isdanger?: string;
}

/**
 * 获取账户信息
 * @param params
 */
export function fetchUserInfo(params: FetchUserParamsType) {
  return request.get('/api/user', {
    params,
  });
}

/**
 * 获取当前用户列表
 * @param params
 */
export function filterUser(params: FilterUserParamsType) {
  return request.get('/api/user/filter', {
    params,
  });
}

interface FetchUserDetailParamsType {
  id: string | number;
}

/**
 * 获取某个用户详细信息
 * @param params
 */
export function fetchUserDetail(params: FetchUserDetailParamsType) {
  return request.get('/api/user/detail', {
    params,
  });
}
