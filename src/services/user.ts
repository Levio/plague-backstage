import request from '@/utils/request';

export interface FetchUserParamsType {
  id: string;
}

export function fetchUserInfo(params: FetchUserParamsType) {
  return request.get('/api/user', {
    params,
  });
}

export function fetchGenderOptions() {
  return request.get('/api/user/gender');
}
