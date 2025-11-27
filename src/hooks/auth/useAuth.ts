import {
  getKakaoLogin,
  postLogin,
  postSignup,
  type LoginRequest,
  type SignUpRequest,
} from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export function useSignup() {
  return useMutation({
    mutationFn: (body: SignUpRequest) => postSignup(body),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginRequest) => postLogin(body),
    onSuccess: async ({ accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
    },
  });
}

export function useKakaoLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code: string) => getKakaoLogin(code),
    onSuccess: (data) => {
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      navigate('/mainpage');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
}
