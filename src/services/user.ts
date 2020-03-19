import request from '@/utils/request';

export interface FetchUserParamsType {
  id: string;
}

export interface FilterUserParamsType {
  name?: string;
  registerTime?: string;
  isdanger?: string;
}

export function fetchUserInfo(params: FetchUserParamsType) {
  return request.get('/api/user', {
    params,
  });
}

export function filterUser(params: FilterUserParamsType) {
  return request.get('/api/user/filter', {
    params,
  });
}
