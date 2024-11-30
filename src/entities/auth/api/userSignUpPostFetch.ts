import { apiFetch } from '@/shared/api/common';

export type TUserSignUpPostFetchParams = {
  email: string;
  password: string;
};

export type TUserSignUpResponse = {
  token: string;
  message: string;
};

export const userSignUpPostFetch = (params: TUserSignUpPostFetchParams) =>
  apiFetch.post<TUserSignUpResponse>('/users/create', params);
