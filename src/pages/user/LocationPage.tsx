import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { AgencySummary } from '../../types/agency';
import LocationSearchSection from '../../components/location/LocationSearchSection';
import LocationListSection from '../../components/location/LocationListSection';
import LocationMapSection from '../../components/location/LocationMapSection';

import ListIcon from '../../assets/ListIcon.png';
import MapIcon from '../../assets/MapIcon.png';

import { instance } from '../../apis/instance';

type ListResponseShape =
  | AgencySummary[]
  | {
      items?: AgencySummary[];
      totalCount?: number;
      data?: {
        items?: AgencySummary[];
        totalCount?: number;
      };
    };

export default function LocationPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState<AgencySummary[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  const [isListMode, setIsListMode] = useState(true);

  const toggleListMode = () => {
    setIsListMode((prev) => !prev);
  };

  useEffect(() => {
    let cancelled = false;

    const fetchAgencies = async () => {
      setLoading(true);
      try {
        const res = await instance.get<ListResponseShape>('/api/agencies/search', {
          params: { keyword },
        });

        if (cancelled) return;

        const body = res.data;
        let items: AgencySummary[] = [];
        let count: number | null = null;

        if (Array.isArray(body)) {
          items = body;
        } else if (body.data?.items && Array.isArray(body.data.items)) {
          items = body.data.items;
          if (typeof body.data.totalCount === 'number') count = body.data.totalCount;
        } else if (body.items && Array.isArray(body.items)) {
          items = body.items;
          if (typeof body.totalCount === 'number') count = body.totalCount;
        }

        setAgencies(items);
        setTotalCount(count ?? items.length);
      } catch {
        if (cancelled) return;
        setAgencies([]);
        setTotalCount(0);
      }
      if (!cancelled) {
        setLoading(false);
      }
    };

    fetchAgencies();

    return () => {
      cancelled = true;
    };
  }, [keyword]);

  const resultCountLabel = `총 ${totalCount ?? agencies.length}개의 기관`;

  const handleCurrentLocation = () => {};

  const handleAgencyClick = (orgCd: string) => {
    navigate(`/location-reservation/${orgCd}`);
  };

  return (
    <div className='flex min-h-screen flex-col bg-[#F5F7FB]'>
      <LocationSearchSection
        keyword={keyword}
        onSearch={(value) => setKeyword(value)}
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
