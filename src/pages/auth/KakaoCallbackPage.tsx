import { useKakaoLogin } from '@/hooks/auth/useAuth';
import { useEffect } from 'react';

export default function KakaoCallbackPage() {
  const { mutate: kakaoLogin, isPending } = useKakaoLogin();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      kakaoLogin(code);
    }
  }, [kakaoLogin]);

  return (
    <div className='flex h-screen items-center justify-center bg-white'>
      <div className='text-center'>
        {isPending ? (
          <p className='text-lg font-medium text-gray-600'>로그인 처리 중...</p>
        ) : (
          <p className='text-lg font-medium text-gray-600'>잠시만 기다려주세요.</p>
        )}
      </div>
    </div>
  );
}
