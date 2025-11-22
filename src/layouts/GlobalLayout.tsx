import { Outlet } from 'react-router-dom';
import BottomLayout from './BottomLayout';
import type { UserType } from '@/types/layout';

interface GlobalLayoutProps {
  userType: UserType;
}

export default function GlobalLayout({ userType }: GlobalLayoutProps) {
  return (
    <div>
      <main className='flex-1 pb-[95px] pt-11'>
        <Outlet />
      </main>
      <BottomLayout userType={userType} />
    </div>
  );
}
