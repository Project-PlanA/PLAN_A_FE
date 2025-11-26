import { useForm } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react'; // 아이콘 라이브러리 (필요시 설치)
import { Button } from '@/components/ui/button'; // Shadcn UI Button
import { Input } from '@/components/ui/input'; // Shadcn UI Input
import { Label } from '@/components/ui/label'; // Shadcn UI Label

// 폼 데이터 타입 정의 (비밀번호 확인 추가)
export interface AgencySignUpFormValues {
  username: string;
  password: string;
  passwordConfirm: string;
}

export default function AgencySignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AgencySignUpFormValues>({
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange', // 실시간 유효성 검사를 위해 onChange 모드 사용
  });

  // 비밀번호 일치 확인을 위해 값 관찰
  const password = watch('password');

  const onSubmit = (data: AgencySignUpFormValues) => {
    console.log('제출 데이터:', data);
    // 다음 단계 로직 구현
  };

  return (
    <div className='flex flex-col'>
      <header className='flex h-14 items-center border-b border-transparent'>
        <button
          type='button'
          className='-ml-2 p-2'>
          <ChevronLeft className='h-6 w-6 text-black' />
        </button>
        <h1 className='ml-2 text-lg font-bold'>기관 회원 가입</h1>
      </header>

      <div className='flex-1 pt-4 pb-24'>
        <div className='mb-6 flex items-center gap-2'>
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white'>
            1
          </div>
          <div className='flex gap-1'>
            <div className='h-1 w-1 rounded-full bg-gray-300' />
            <div className='h-1 w-1 rounded-full bg-gray-300' />
            <div className='h-1 w-1 rounded-full bg-gray-300' />
          </div>
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-300'>
            2
          </div>
        </div>

        <h2 className='mb-8 text-2xl font-bold text-gray-900'>회원 정보 입력</h2>

        <form
          id='agency-form'
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='username'
              className='text-base font-semibold text-gray-800'>
              아이디
            </Label>
            <Input
              id='username'
              placeholder='아이디를 입력하세요.'
              className='h-12 border-none bg-gray-100 text-base placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500'
              {...register('username', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[A-Za-z0-9]{5,12}$/,
                  message: '영문, 숫자 포함 5자~12자',
                },
              })}
            />
            <p className={`text-xs ${errors.username ? 'text-red-500' : 'text-gray-400'}`}>
              {errors.username?.message || '영문, 숫자 포함 5자~12자'}
            </p>
          </div>

          {/* 비밀번호 필드 */}
          <div className='space-y-2'>
            <Label
              htmlFor='password'
              className='text-base font-semibold text-gray-800'>
              비밀번호
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='비밀번호를 입력하세요.'
              className='h-12 border-none bg-gray-100 text-base placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500'
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                  message: '영문, 숫자, 특수문자 포함 8~16자',
                },
              })}
            />
            <p className={`text-xs ${errors.password ? 'text-red-500' : 'text-gray-400'}`}>
              {errors.password?.message || '영문, 숫자, 특수문자 포함 8~16자'}
            </p>
          </div>

          {/* 비밀번호 확인 필드 */}
          <div className='space-y-2'>
            <Label
              htmlFor='passwordConfirm'
              className='text-base font-semibold text-gray-800'>
              비밀번호 확인
            </Label>
            <Input
              id='passwordConfirm'
              type='password'
              placeholder='비밀번호를 한 번 더 입력하세요.'
              className='h-12 border-none bg-gray-100 text-base placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500'
              {...register('passwordConfirm', {
                required: '비밀번호를 다시 입력해주세요.',
                validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.passwordConfirm && (
              <p className='text-xs text-red-500'>{errors.passwordConfirm.message}</p>
            )}
          </div>
        </form>
      </div>

      {/* 4. 하단 고정 버튼 */}
      <div className='right-0 bottom-0 left-0 p-0'>
        <Button
          type='submit'
          form='agency-form'
          disabled={!isValid}
          className={`h-14 w-full rounded-none text-lg font-medium transition-colors ${
            isValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-white hover:bg-gray-300'
          }`}>
          다음
        </Button>
      </div>
    </div>
  );
}
