import type { BottomNavItem } from '@/types/layout';

import cHome from '@/assets/c_home.png';
import home from '@/assets/home.png';
import cSearch from '@/assets/c_search.png';
import search from '@/assets/search.png';
import cLocation from '@/assets/c_location.png';
import locationIcon from '@/assets/location.png';
import cChat from '@/assets/c_chat.png';
import chat from '@/assets/chat.png';
import cUser from '@/assets/c_user.png';
import user from '@/assets/user.png';
import cMatch from '@/assets/c_match.png';
import match from '@/assets/match.png';

export const userNavItems: BottomNavItem[] = [
  { label: '홈', path: '/mainpage', activeIcon: cHome, inactiveIcon: home },
  { label: '채용 공고', path: '/searchpage', activeIcon: cSearch, inactiveIcon: search },
  { label: '기관 찾기', path: '/locationpage', activeIcon: cLocation, inactiveIcon: locationIcon },
  { label: '상담', path: '/chatpage', activeIcon: cChat, inactiveIcon: chat },
  { label: '마이', path: '/mypage', activeIcon: cUser, inactiveIcon: user },
];

export const agencyNavItems: BottomNavItem[] = [
  { label: '홈', path: '/agency/main', activeIcon: cHome, inactiveIcon: home },
  { label: '채용 공고', path: '/agency/search', activeIcon: cSearch, inactiveIcon: search },
  { label: '상담 관리', path: '/agency/consult', activeIcon: cChat, inactiveIcon: chat },
  { label: '매칭 관리', path: '/agency/match', activeIcon: cMatch, inactiveIcon: match },
  { label: '마이', path: '/mypage', activeIcon: cUser, inactiveIcon: user },
];
