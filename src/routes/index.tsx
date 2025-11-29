import { Navigate } from 'react-router-dom';
import GlobalLayout from '@/components/layouts/GlobalLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

import UserLoginPage from '@/pages/auth/UserLoginPage';
import AgencyLoginPage from '@/pages/auth/AgencyLoginPage';

import MainPage from '@/pages/user/MainPage';
import SearchPage from '@/pages/user/SearchPage';
import LocationPage from '@/pages/user/LocationPage';
import ChatPage from '@/pages/user/ChatPage';
import MyPage from '@/pages/user/MyPage';

import AgencyMainPage from '@/pages/agency/AgencyMainPage';
import AgencySearchPage from '@/pages/agency/AgencySearchPage';
import ConsultManagePage from '@/pages/agency/ConsultManagePage';
import MatchManagePage from '@/pages/agency/MatchManagePage';

import type { UserType } from '@/types/layout';

import SignupLayout from '@/components/layouts/SignUpLayout';
import AgencySignupStep1 from '@/pages/auth/AgencySignupStep1';
import AgencySignupStep2 from '@/pages/auth/AgencySignupStep2';
import KakaoCallbackPage from '@/pages/auth/KakaoCallbackPage';
import ChatDetailPage from '@/pages/user/Chat-Detail-Page';

export const createRoutes = (userType: UserType) => [
  {
    element: <GlobalLayout userType={userType} />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to='/login'
            replace
          />
        ),
      },
      { path: '/mainpage', element: <MainPage /> },
      { path: '/searchpage', element: <SearchPage /> },
      { path: '/locationpage', element: <LocationPage /> },
      { path: '/chatpage', element: <ChatPage /> },
      { path: '/chat-detail-page/:id', element: <ChatDetailPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/agency/main', element: <AgencyMainPage /> },
      { path: '/agency/search', element: <AgencySearchPage /> },
      { path: '/agency/consult', element: <ConsultManagePage /> },
      { path: '/agency/match', element: <MatchManagePage /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <UserLoginPage /> },
      { path: '/kakao/callback', element: <KakaoCallbackPage /> },
      { path: '/agency-login', element: <AgencyLoginPage /> },

      {
        path: '/agency-signup',
        element: <SignupLayout />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to='step1'
                replace
              />
            ),
          },
          // 실제 단계별 페이지들
          { path: 'step1', element: <AgencySignupStep1 /> },
          { path: 'step2', element: <AgencySignupStep2 /> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: (
      <Navigate
        to='/mainpage'
        replace
      />
    ),
  },
];
