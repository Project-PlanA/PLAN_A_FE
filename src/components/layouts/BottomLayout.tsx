import { Link, useLocation } from 'react-router-dom';
import type { UserType } from '@/types/layout';
import { userNavItems, agencyNavItems } from '@/constants/bottomNav';

interface BottomLayoutProps {
  userType: UserType;
}

export default function BottomLayout({ userType }: BottomLayoutProps) {
  const location = useLocation();
  const navItems = userType === 'agency' ? agencyNavItems : userNavItems;

  return (
    <nav className='bg-white fixed bottom-0 left-1/2 z-1 h-[95px] w-full max-w-[390px] -translate-x-1/2 shadow-[0_-1px_2px_rgba(0,0,0,0.2)]'>
      <ul className='flex justify-between px-3 py-4'>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.path}
              className='flex-1'>
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 text-xs font-medium ${isActive ? 'text-black' : 'text-[#C4C4C4]'} `}>
                <img
                  src={isActive ? item.activeIcon : item.inactiveIcon}
                  alt={item.label}
                  className='h-6 w-6'
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
