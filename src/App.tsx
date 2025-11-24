import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoutes } from '@/routes';
import type { UserType } from '@/types/layout';

const queryClient = new QueryClient();

function App() {
  const userType: UserType = 'user'; // 로그인 구현 전이라 'user'로 고정해둠
  const router = createBrowserRouter(createRoutes(userType));

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-screen justify-center'>
        <div className='flex w-full max-w-[390px] flex-col bg-white shadow-[0_-1px_2px_rgba(0,0,0,0.2)]'>
          <RouterProvider router={router} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
