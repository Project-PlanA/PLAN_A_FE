import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';

export interface LoginFormValues {
  username: string;
  password: string;
}

export default function AgencyLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className='mt-10'>로고</div>
      <div className='mt-10 text-2xl font-semibold'>기관 회원 로그인</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col py-16'>
        <FieldSet className='gap-6'>
          {/* 아이디 */}

          <Field
            className='gap-1'
            data-invalid={!!errors.username}>
            <FieldLabel
              htmlFor='username'
              className='text-sm'>
              아이디
            </FieldLabel>
            <Input
              className='focus-visible::border-main-blue-400 border-transparent bg-gray-100 py-6 placeholder:text-sm focus-visible:ring-0 focus-visible:outline-none'
              id='username'
              aria-invalid={!!errors.username}
              type='text'
              placeholder='아이디를 입력하세요.'
              {...register('username', { required: '필수 항목입니다.' })}
            />
            {errors.username && <FieldError errors={[errors.username]} />}
          </Field>

          {/* 비밀번호 */}

          <Field
            className='gap-1'
            data-invalid={!!errors.password}>
            <FieldLabel
              htmlFor='password'
              className='text-sm'>
              비밀번호
            </FieldLabel>
            <Input
              className='border-none bg-gray-100 py-6'
              id='password'
              placeholder='비밀번호를 입력하세요.'
              aria-invalid={!!errors.password}
              type='password'
              {...register('password', { required: '필수 항목입니다.' })}
            />
            {errors.password && <FieldError errors={[errors.password]} />}
          </Field>

          <Button
            disabled={!isValid}
            type='submit'
            className={`mt-4 w-full py-6 ${
              isValid
                ? 'hover:bg-main-blue-500 bg-blue-500 text-white'
                : 'cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300'
            } `}>
            로그인
          </Button>
        </FieldSet>

        <Button
          variant='link'
          className='self-center'
          asChild>
          <Link to='/agency-signup'>회원가입</Link>
        </Button>
      </form>
    </>
  );
}
