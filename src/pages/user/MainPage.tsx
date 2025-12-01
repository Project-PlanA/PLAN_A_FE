import { Button } from '@/components/ui/button';

export default function MainPage() {
  return (
    <div>
      <div>일반유저 홈</div>
      <Button onClick={() => localStorage.clear()}>누르고 새로고침하면 로그아웃</Button>
    </div>
  );
}
