type LocationMapSectionProps = {
  isVisible: boolean;
};

export default function LocationMapSection({ isVisible }: LocationMapSectionProps) {
  if (!isVisible) return null;

  return <div className='w-full'></div>;//지도 넣을 예정
}
