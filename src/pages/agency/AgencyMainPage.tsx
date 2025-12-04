import { Button } from '@/components/ui/button';

export default function AgencyMainPage() {
  return (
    <div>
      기관용 홈
      <div>
        {' '}
        <Button onClick={() => localStorage.clear()}>누르고 새로고침하면 로그아웃</Button>
      </div>
    </div>
  );
}
