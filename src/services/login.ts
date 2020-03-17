import request from '@/utils/request';

export interface LoginParamsType {
  name: string;
  password: string;
}

export function login(data: LoginParamsType) {
  return request.post('/api/login', {
    data,
  });
}
