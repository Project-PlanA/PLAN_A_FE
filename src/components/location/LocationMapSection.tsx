import CurrentLocationIcon from '../../assets/CurrentLocationIcon.png';

type LocationMapSectionProps = {
  isVisible: boolean;
  onCurrentLocation: () => void;
};

export default function LocationMapSection({
  isVisible,
  onCurrentLocation,
}: LocationMapSectionProps) {
  if (!isVisible) return null;

  return (
    <>
      <div className='px-5'>
        <button
          type='button'
          onClick={onCurrentLocation}>
          <img
            src={CurrentLocationIcon}
            alt='현위치 버튼'
            className='h-[35px] w-[85px]'
          />
        </button>
      </div>
    </>
  );
}
