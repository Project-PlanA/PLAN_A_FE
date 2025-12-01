import { Navigate, Outlet } from 'react-router';

export default function ProtectedLayout() {
  const hasToken = !!localStorage.getItem('accessToken');

  if (!hasToken) {
    return (
      <Navigate
        to='/login'
        replace // 뒤로가기 방지
      />
    );
  }

  return <Outlet />;
}
