import SearchBar from '../common/SearchBar';
import CurrentLocationIcon from '../../assets/CurrentLocationIcon.png';

type Props = {
  keyword: string;
  onSearch: (value: string) => void;
  onCurrentLocation: () => void;
};

export default function LocationSearchSection({ keyword, onSearch, onCurrentLocation }: Props) {
  return (
    <header className='bg-white px-5 pt-4 pb-3'>
      <h1 className='text-lg font-semibold text-[#000000]'>일자리 지원 기관 찾기</h1>
      <div className='mt-3 '>
        <SearchBar
          value={keyword}
          onChange={onSearch}
          placeholder='지역, 기관명 검색'
        />
      </div>

      <button
        type='button'
        onClick={onCurrentLocation}
        className='mt-3'>
        <img
          src={CurrentLocationIcon}
          alt='현위치 버튼'
          className='h-[35px] w-[85px]'
        />
      </button>
    </header>
  );
}
