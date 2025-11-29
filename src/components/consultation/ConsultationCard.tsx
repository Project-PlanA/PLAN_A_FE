// src/components/consultation/ConsultationCard.tsx
import { ChevronRight } from 'lucide-react';

interface ConsultationCardProps {
  time: string;
  agencyName: string;
  onClick?: () => void;
}

export default function ConsultationCard({ time, agencyName, onClick }: ConsultationCardProps) {
  return (
    <div
      onClick={onClick}
      className='mb-3 flex w-full cursor-pointer items-center justify-between rounded-xl bg-blue-50 p-5 hover:bg-blue-100'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-[#3B82F6]' />
          <span className='text-sm font-medium text-gray-500'>{time}</span>
        </div>
        <h3 className='font-bold text-gray-900'>{agencyName}</h3>
      </div>
      <ChevronRight className='h-5 w-5 text-gray-400' />
    </div>
  );
}
