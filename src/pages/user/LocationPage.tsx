import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LocationSearchSection from '../../components/location/LocationSearchSection';
import LocationMapSection from '../../components/location/LocationMapSection';
import LocationListSection from '../../components/location/LocationListSection';

import ListIcon from '../../assets/ListIcon.png';
import MapIcon from '../../assets/MapIcon.png';

import type { AgencySummary } from '../../types/agency';
import { useAgencySearch, useNearbyAgencySearch } from '../../hooks/agency/useAgencySearch';

export default function LocationPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [agencies, setAgencies] = useState<AgencySummary[]>([]);
  const [isListMode, setIsListMode] = useState(true);

  const { mutateAsync: searchMutate, isPending: isSearching } = useAgencySearch();
  const { mutateAsync: nearbyMutate, isPending: isNearbyLoading } = useNearbyAgencySearch();

  const loading = isSearching || isNearbyLoading;

  const handleSearch = async (value: string) => {
    setKeyword(value);
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      setAgencies([]);
      setIsListMode(false);
      return;
    }

    if (trimmed.length < 2) {
      return;
    }

    try {
      const data = await searchMutate(trimmed);
      setAgencies(data);
      setIsListMode(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAgencyClick = (orgCd: string) => {
    navigate(`/locationpage/${orgCd}`); //예약페이지 추가 예정
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 가져오지 못했어요.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const data = await nearbyMutate({ lat: latitude, lng: longitude });
          setAgencies(data);
          setIsListMode(true);
        } catch (e) {
          console.error(e);
        }
      },
      (err) => {
        console.error(err);
        alert('위치 정보를 가져오지 못했어요.');
      }
    );
  };

  const toggleListMode = () => {
    setIsListMode((prev) => !prev);
  };

  const resultCountLabel =
    Array.isArray(agencies) && agencies.length > 0 ? `${agencies.length}개의 기관` : '0개의 기관';

  return (
    <div className='flex min-h-screen flex-col bg-[#F5F7FB]'>
      <LocationSearchSection
        keyword={keyword}
        onSearch={handleSearch}
        onCurrentLocation={handleCurrentLocation}
      />

      <main className='relative flex-1 bg-white'>
        <LocationMapSection isVisible={!isListMode} />
        <LocationListSection
          isVisible={isListMode}
          agencies={agencies}
          loading={loading}
          keyword={keyword}
          resultCountLabel={resultCountLabel}
          onClickAgency={handleAgencyClick}
          onCurrentLocation={handleCurrentLocation}
        />

        <div className='fixed bottom-28 left-1/2 z-20 -translate-x-1/2'>
          <button
            type='button'
            onClick={toggleListMode}>
            <img
              src={isListMode ? MapIcon : ListIcon}
              alt='목록 또는 지도 버튼'
              className='h-10 w-[90px]'
            />
          </button>
        </div>
      </main>
    </div>
  );
}
