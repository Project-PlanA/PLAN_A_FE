import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react'; // 카카오 아이콘 대용 (혹은 svg 사용)
import { useNavigate } from 'react-router';

export default function UserLoginPage() {
  const navigator = useNavigate();
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='flex flex-col bg-white'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div className='flex h-24 w-24 items-center justify-center border border-black text-xl font-bold'>
          로고
        </div>
      </div>

      <div className='mb-10 w-full space-y-4'>
        <div className='relative flex items-center justify-center py-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-gray-300' />
          </div>
          <div className='relative bg-white px-2 text-xs text-gray-400'>로그인/회원가입</div>
        </div>

        <button
          onClick={handleKakaoLogin}
          className='flex w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] py-3.5 text-[15px] font-semibold text-[#191919] hover:bg-[#FDD835]'>
          <MessageCircle className='h-5 w-5 fill-current' />
          카카오로 시작하기
        </button>

        <div className='text-center'>
          <Button
            onClick={() => navigator('/agency-login')}
            variant={'link'}
            className='text-sm text-gray-500 underline decoration-gray-400 underline-offset-4'>
            기관 회원 로그인/회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
