import { Navigate, Outlet } from 'react-router';

export default function GuestOnlyLayout() {
  const hasToken = !!localStorage.getItem('accessToken');

  if (hasToken) {
    return (
      <Navigate
        to='/mainpage'
        replace // 뒤로가기 방지
      />
    );
  }

  return <Outlet />;
}
