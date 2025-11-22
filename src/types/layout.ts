// 바텀 네비 유저 타입
export type UserType = 'user' | 'agency';

// 바텀 네비 아이템 타입
export interface BottomNavItem {
  label: string;
  path: string;
  activeIcon: string;
  inactiveIcon: string;
}
