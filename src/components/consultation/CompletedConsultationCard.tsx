// src/components/consultation/CompletedConsultationCard.tsx
import { ChevronRight, Calendar, Clock } from 'lucide-react';

// 상태 타입 정의
export type ConsultationStatus = 'before' | 'matching' | 'completed';

interface CompletedConsultationCardProps {
  agencyName: string;
  date: string;
  time: string;
  status: ConsultationStatus;
  onClick?: () => void;
}

export default function CompletedConsultationCard({
  agencyName,
  date,
  time,
  status,
  onClick,
}: CompletedConsultationCardProps) {
  // 상태별 뱃지 스타일 및 텍스트 결정 함수
  const getStatusBadge = () => {
    switch (status) {
      case 'before':
        return (
          <span className='rounded-full bg-gray-400 px-4 py-1.5 text-sm font-medium text-white'>
            매칭 전
          </span>
        );
      case 'matching':
        return (
          <span className='rounded-full border border-[#3B82F6] bg-white px-4 py-1.5 text-sm font-medium text-[#3B82F6]'>
            매칭 중
          </span>
        );
      case 'completed':
        return (
          <span className='rounded-full bg-[#3B82F6] px-4 py-1.5 text-sm font-medium text-white'>
            매칭 완료
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className='mb-3 w-full cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='text-base font-bold text-gray-900'>{agencyName}</h3>
        <ChevronRight className='h-5 w-5 text-gray-400' />
      </div>

      <div className='flex items-end justify-between'>
        <div className='flex flex-col gap-1.5'>
          <div className='flex items-center gap-2 text-gray-500'>
            <Calendar className='h-4 w-4' />
            <span className='text-sm'>{date}</span>
          </div>
          <div className='flex items-center gap-2 text-gray-500'>
            <Clock className='h-4 w-4' />
            <span className='text-sm'>{time}</span>
          </div>
        </div>

        <div>{getStatusBadge()}</div>
      </div>
    </div>
  );
}
