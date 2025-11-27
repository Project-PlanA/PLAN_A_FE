import { Outlet } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

export interface SignupFormValues {
  username: string;
  password: string;
  passwordCheck: string;
  orgCd: string;
  tel: string;
  zipAddr: string;
  dtlAddr: string;
}

export default function SignupLayout() {
  const signupForm = useForm<SignupFormValues>({
    defaultValues: {
      username: '',
      password: '',
      passwordCheck: '',
      orgCd: '',
      tel: '',
      zipAddr: '',
      dtlAddr: '',
    },
    mode: 'onChange',
  });

  return (
    <FormProvider {...signupForm}>
      <div className='signup-container'>
        {/* 공통 헤더 
           <Header /> 
        */}

        <Outlet />
      </div>
    </FormProvider>
  );
}
