// src/pages/ChatPage.tsx
import { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { ko } from 'react-day-picker/locale';
import { Calendar } from '@/components/ui/calendar'; // shadcn calendar 경로 확인
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { X, Calendar as CalendarIcon, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import ConsultationCard from '@/components/consultation/ConsultationCard';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import type { ConsultationStatus } from '@/components/consultation/CompletedConsultationCard';
import CompletedConsultationCard from '@/components/consultation/CompletedConsultationCard';
import { useNavigate } from 'react-router';

// 타입 정의
interface Consultation {
  id: number;
  date: Date;
  time: string;
  agencyName: string;
  address: string;
  phone: string;
  status: 'scheduled' | 'completed';
}

// 11월 20일 더미 데이터
const DUMMY_DATA: Consultation[] = [
  {
    id: 1,
    date: new Date(2025, 10, 20), // 월은 0부터 시작 (10 = 11월)
    time: '오전 10:30',
    agencyName: '노원어르신일자리지원센터',
    address: '서울시 노원구 한글비석로 371(중계동) 중계온마을센터 가동 3층',
    phone: '02-2116-3777',
    status: 'scheduled',
  },
  {
    id: 2,
    date: new Date(2025, 10, 20),
    time: '오후 2:00',
    agencyName: '서울시니어일자리지원센터',
    address: '서울시 종로구 삼일대로 461 4층',
    phone: '02-1234-5678',
    status: 'scheduled',
  },
];

interface CompletedConsultation {
  id: number;
  agencyName: string;
  date: string;
  time: string;
  status: ConsultationStatus;
}

// [추가] 상담 완료 탭용 더미 데이터
const COMPLETED_DUMMY_DATA: CompletedConsultation[] = [
  {
    id: 1,
    agencyName: '서울시니어일자리지원센터',
    date: '2025년 11월 20일',
    time: '오후 2:00',
    status: 'before', // 매칭 전
  },
  {
    id: 2,
    agencyName: '노원어르신일자리지원센터',
    date: '2025년 11월 20일',
    time: '오전 10:30',
    status: 'matching', // 매칭 중
  },
  {
    id: 3,
    agencyName: '종로시니어클럽',
    date: '2025년 11월 1일',
    time: '오후 12:00',
    status: 'completed', // 매칭 완료
  },
];

export default function ChatPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 10, 20)); // 기본 11월 20일 선택
  const [activeTab, setActiveTab] = useState<'schedule' | 'completed'>('schedule');

  // 선택된 날짜와 탭에 맞는 데이터 필터링
  const filteredData = DUMMY_DATA.filter((item) => {
    if (!date) return false;
    const isDateMatch = isSameDay(item.date, date);
    const isStatusMatch =
      activeTab === 'schedule' ? item.status === 'scheduled' : item.status === 'completed';
    return isDateMatch && isStatusMatch;
  });

  return (
    <div className='flex flex-col px-5'>
      {/* 헤더 */}
      <header className='pb-5'>
        <h1 className='text-2xl font-bold text-gray-900'>상담</h1>
      </header>

      {/* 탭 메뉴 */}
      <div className='mb-4 flex border-b border-gray-100'>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 pb-3 ${
            activeTab === 'schedule' ? 'border-b-2 border-[#3B82F6] text-black' : 'text-gray-400'
          }`}>
          상담 일정
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 pb-3 ${
            activeTab === 'completed' ? 'border-b-2 border-[#3B82F6] text-black' : 'text-gray-400'
          }`}>
          상담 완료
        </button>
      </div>

      {activeTab === 'schedule' ? (
        <div>
          {/* 캘린더 영역 */}
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            locale={ko}
            className='w-full'
            formatters={{
              // caption(상단 년/월)을 "2025년 11월" 형식으로
              formatCaption: (month, options) => {
                return format(month, 'yyyy년 MM월', options);
              },
            }}
          />

          {/* 구분선 */}
          <Separator />

          {/* 상담 리스트 영역 */}
          <div className='flex-1'>
            <div className='my-4 text-sm text-gray-500'>{filteredData.length}건의 상담 일정</div>

            {filteredData.map((item) => (
              <Drawer key={item.id}>
                <DrawerTrigger asChild>
                  {/* Trigger로 감싸서 클릭 시 열리게 함 */}
                  <div>
                    <ConsultationCard
                      time={item.time}
                      agencyName={item.agencyName}
                    />
                  </div>
                </DrawerTrigger>

                {/* 바텀 시트 (Drawer) 내용 */}
                <DrawerContent className='mx-auto max-w-[390px] rounded-t-[20px]'>
                  <div className='px-5 pt-2 pb-8'>
                    <DrawerHeader className='px-0 pt-0 text-left'>
                      <div className='flex items-start justify-between'>
                        <div className='mb-2 flex items-center gap-2'>
                          <span className='text-sm text-gray-500'>상담 예약 일정</span>
                          <CheckCircle2 className='h-4 w-4 fill-[#3B82F6] stroke-white text-[#3B82F6]' />
                        </div>
                        <DrawerClose asChild>
                          <button className='p-1'>
                            <X className='h-6 w-6 text-gray-400' />
                          </button>
                        </DrawerClose>
                      </div>
                      <DrawerTitle className='text-xl font-bold text-gray-900'>
                        {item.agencyName}
                      </DrawerTitle>
                    </DrawerHeader>

                    {/* 구분선 */}
                    <Separator className='mb-4' />

                    {/* 상세 정보 */}
                    <div className='mb-8 flex flex-col gap-6'>
                      <div className='flex items-center gap-3'>
                        <CalendarIcon className='h-5 w-5 text-[#3B82F6]' />
                        <span className='text-base text-gray-900'>
                          {format(item.date, 'yyyy년 MM월 dd일', { locale: ko })}
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Clock className='h-5 w-5 text-[#3B82F6]' />
                        <span className='text-base text-gray-900'>{item.time}</span>
                      </div>
                      <div className='flex items-start gap-3'>
                        <MapPin className='mt-0.5 h-5 w-5 shrink-0 text-[#3B82F6]' />
                        <span className='text-base leading-snug text-gray-900'>{item.address}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Phone className='h-5 w-5 text-[#3B82F6]' />
                        <span className='text-base text-gray-900'>{item.phone}</span>
                      </div>
                    </div>

                    {/* 예약 취소 버튼 */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className='w-full rounded-xl bg-[#3B82F6] py-6 text-base font-medium hover:bg-blue-600'>
                          예약 취소
                        </Button>
                      </DialogTrigger>

                      <DialogContent className='max-w-[320px] px-5 py-6'>
                        <DialogHeader className='flex flex-col items-center justify-center text-center sm:text-center'>
                          <DialogTitle className='text-lg font-bold text-gray-900'>
                            상담 예약을 취소할까요?
                          </DialogTitle>
                          <DialogDescription className='mt-2 text-sm text-gray-500'>
                            예약을 취소하시면, '{item.agencyName}'
                            <br />
                            상담 일정이 삭제됩니다.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className='mt-4 flex-row gap-2 sm:justify-center'>
                          {/* 유지하기 버튼 (Dialog 닫기) */}
                          <DialogClose asChild>
                            <Button
                              variant='outline'
                              className='h-11 flex-1 rounded-lg border-[#3B82F6] text-[#3B82F6] hover:bg-blue-50 hover:text-[#3B82F6]'>
                              유지하기
                            </Button>
                          </DialogClose>

                          {/* 예약 취소 확정 버튼 */}
                          <Button
                            className='h-11 flex-1 rounded-lg bg-[#3B82F6] hover:bg-blue-600'
                            onClick={() => {
                              // 여기에 실제 삭제 로직 추가 (예: API 호출)
                              console.log('예약 취소됨:', item.id);
                            }}>
                            예약 취소
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}

            {/* 데이터가 없을 때 표시 */}
            {filteredData.length === 0 && (
              <div className='flex h-40 flex-col items-center justify-center text-gray-400'>
                <p>해당 날짜에 상담 일정이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex h-full flex-col'>
          {/* 상단 정보: 건수 및 정렬 필터 */}
          <div className='mt-4 mb-4 flex items-center justify-between'>
            <span className='text-sm text-gray-500'>
              {COMPLETED_DUMMY_DATA.length}건의 상담 내역
            </span>
            <div className='flex cursor-pointer items-center gap-1.5'>
              <div className='h-1.5 w-1.5 rounded-full bg-[#3B82F6]' />
              <span className='text-sm font-medium text-gray-900'>최신순</span>
            </div>
          </div>

          {/* 리스트 영역 */}
          <div className='flex-1 pb-4'>
            {COMPLETED_DUMMY_DATA.length > 0 ? (
              COMPLETED_DUMMY_DATA.map((item) => (
                <CompletedConsultationCard
                  key={item.id}
                  agencyName={item.agencyName}
                  date={item.date}
                  time={item.time}
                  status={item.status}
                  onClick={() => navigate(`/chat-detail-page/${item.id}`)}
                />
              ))
            ) : (
              /* 데이터가 없을 경우 (Empty State) */
              <div className='flex h-[60vh] flex-col items-center justify-center text-gray-400'>
                <p className='text-base'>상담 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
