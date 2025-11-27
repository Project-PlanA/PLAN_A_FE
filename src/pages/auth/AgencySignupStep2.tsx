import Button from '@/components/common/Button';
import type { SignupFormValues } from '@/components/layouts/SignUpLayout';
import { Input } from '@/components/ui/input';
import { useSignup } from '@/hooks/auth/useAuth';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function AgencySignupStep2() {
  const navigator = useNavigate();
  const { register, handleSubmit } = useFormContext<SignupFormValues>();
  const { mutate: postSignup } = useSignup();

  const onSubmit = (data: SignupFormValues) => {
    console.log('🚀 [회원가입 요청 데이터]', data);
    postSignup(data, {
      onSuccess: () => {
        navigator('/agency-login');
      },
    });
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex-1 space-y-6'>
        <p className='text-lg font-bold'>회원 정보 입력</p>

        {/* 1. 아이디 입력 */}
        <div>
          <label className='mb-1 block text-sm text-gray-700'>
            아이디<span className='ml-0.5 text-xs text-blue-500'>●</span>
          </label>
          <Input
            {...register('username')}
            placeholder='아이디를 입력하세요.'
            className='px-4 py-3'
          />
          <p className='mt-1 text-xs text-gray-400'>영문, 숫자 포함 5자~12자</p>
        </div>

        {/* 2. 비밀번호 입력 */}
        <div>
          <label className='mb-1 block text-sm text-gray-700'>
            비밀번호<span className='ml-0.5 text-xs text-blue-500'>●</span>
          </label>
          <Input
            {...register('password')}
            type='password'
            placeholder='비밀번호를 입력하세요.'
            className='px-4 py-3'
          />
          <p className='mt-1 text-xs text-gray-400'>영문, 숫자, 특수문자 포함 8~16자</p>
        </div>

        {/* 3. 비밀번호 확인 입력 */}
        <div>
          <label className='mb-1 block text-sm text-gray-700'>
            비밀번호 확인<span className='ml-0.5 text-xs text-blue-500'>●</span>
          </label>
          <Input
            {...register('passwordCheck')}
            type='password'
            placeholder='비밀번호를 한 번 더 입력하세요.'
            className='px-4 py-3'
          />
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className='bg-white p-4'>
        <Button onClick={handleSubmit(onSubmit)}>회원가입 완료</Button>
      </div>
    </div>
  );
}
