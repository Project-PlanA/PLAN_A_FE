import type { BottomNavItem } from '@/types/layout';

export const userNavItems: BottomNavItem[] = [
  { label: '홈', path: '/mainpage', activeIcon: '/c_home.png', inactiveIcon: '/home.png' },
  { label: '채용 공고', path: '/searchpage', activeIcon: '/c_search.png', inactiveIcon: '/search.png' },
  { label: '기관 찾기', path: '/locationpage', activeIcon: '/c_location.png', inactiveIcon: '/location.png' },
  { label: '상담', path: '/chatpage', activeIcon: '/c_chat.png', inactiveIcon: '/chat.png' },
  { label: '마이', path: '/mypage', activeIcon: '/c_user.png', inactiveIcon: '/user.png' },
];

export const agencyNavItems: BottomNavItem[] = [
  { label: '홈', path: '/agency/main', activeIcon: '/c_home.png', inactiveIcon: '/home.png' },
  { label: '채용 공고', path: '/agency/search', activeIcon: '/c_search.png', inactiveIcon: '/search.png' },
  { label: '상담 관리', path: '/agency/consult', activeIcon: '/c_chat.png', inactiveIcon: '/chat.png' },
  { label: '매칭 관리', path: '/agency/match', activeIcon: '/c_match.png', inactiveIcon: '/match.png' },
  { label: '마이', path: '/mypage', activeIcon: '/c_user.png', inactiveIcon: '/user.png' },
];
