import { instance } from '@/apis/instance';

export interface SignUpRequest {
  username: string;
  password: string;
  passwordCheck: string;
  orgCd: string;
  tel: string;
  zipAddr: string;
  dtlAddr: string;
}

export const postSignup = async (body: SignUpRequest) => {
  const { data } = await instance.post('/auth/agency/signup', body);
  return data;
};

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  userId: number;
  username: string;
  accessToken: string;
}

export const postLogin = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await instance.post('/auth/agency/login', body);
  return data;
};

interface KakaoLoginResponse {
  accessToken: string;
  isNewUser: boolean;
  userId: number;
  name: string;
}

export const getKakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  const { data } = await instance.get(`/login/oauth2/code/kakao`, { params: { code } });
  console.log(data);
  return data;
};
