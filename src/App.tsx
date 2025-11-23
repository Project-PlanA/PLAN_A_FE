import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoutes } from '@/routes';
import type { UserType } from '@/types/layout';

function App() {
  const userType: UserType = 'user'; // 로그인 구현 전이라 'user'로 고정해둠
  const router = createBrowserRouter(createRoutes(userType));

  return (
    <div className='flex min-h-screen justify-center'>
      <div className='flex w-full max-w-[390px] flex-col bg-white shadow-[0_-1px_2px_rgba(0,0,0,0.2)]'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
