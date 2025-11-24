import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className='flex-1 px-5 pt-6 pb-6'>
      <Outlet />
    </main>
  );
}
