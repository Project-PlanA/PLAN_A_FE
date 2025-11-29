interface MatchingCardProps {
  company: string;
  title: string;
  location: string;
  date: string;
  badge?: string;
}

export function MatchingCard({ company, title, location, date, badge }: MatchingCardProps) {
  return (
    <div className='flex flex-col gap-2 rounded-xl bg-gray-100 p-5'>
      <span className='text-xs text-gray-400'>{company}</span>
      <h3 className='text-[15px] leading-snug font-medium text-gray-900'>{title}</h3>

      {/* 배지(태그)가 있을 경우에만 렌더링 */}
      {badge && (
        <div className='mt-1'>
          <span className='rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-500'>
            {badge}
          </span>
        </div>
      )}

      <div className='mt-2 flex items-center justify-between text-xs text-gray-400'>
        <span>{location}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}
