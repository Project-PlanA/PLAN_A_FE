import Button from '@/components/common/Button';
import { type SignupFormValues } from '@/components/layouts/SignUpLayout';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useAgencySearch } from '@/hooks/agency/useAgencySearch';
import type { AgencySummary } from '@/types/agency';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function AgencySignupStep1() {
  const navigator = useNavigate();
  // register와 watch를 추가로 가져옵니다.
  const { setValue, register } = useFormContext<SignupFormValues>();

  // 입력된 값 실시간 확인 (값이 있으면 UI 보여주기 용도)

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);

  // 입력 및 검색 최적화
  const [list, setList] = useState<AgencySummary[]>([]);
  const { mutateAsync: searchAgencyList } = useAgencySearch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchList = async () => {
      if (!debouncedKeyword) {
        setList([]);
        return;
      }

      try {
        const data = await searchAgencyList(debouncedKeyword);
        setList(data);
      } catch (error) {
        console.error(error);
        alert('기관 목록을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchList();
  }, [debouncedKeyword, searchAgencyList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setIsListVisible(true);

    if (value === '') {
      setValue('orgCd', '');
      setValue('zipAddr', '');
      setValue('dtlAddr', '');
      setValue('tel', '');
    }
  };

  const handleSelectAgency = (agency: AgencySummary) => {
    // 1. 검색창 UI 업데이트
    setKeyword(agency.orgName);
    setIsListVisible(false);

    // 2. 폼 데이터 일괄 업데이트 (API 재호출 없이 즉시 반영)
    setValue('orgCd', agency.orgCd);
    setValue('zipAddr', agency.zipAddr || '');
    // API의 dtlAddr이 있다면 넣고, 없다면 기관명 등을 대체로 넣을 수도 있음
    setValue('dtlAddr', agency.dtlAddr || '');
    setValue('tel', agency.tel || '');
  };

  return (
    <div className='flex flex-col'>
      <div className='flex-1'>
        <div>
          <label className='text-sm text-gray-700'>
            기관명<span className='text-xs text-blue-500'>●</span>
          </label>
          <div className='relative'>
            <InputGroup>
              <InputGroupAddon align={'inline-start'}>
                <Search className='h-5 w-5 text-gray-500' />
              </InputGroupAddon>
              <InputGroupInput
                placeholder='기관명을 입력해주세요'
                value={keyword}
                onChange={handleInputChange}
              />
            </InputGroup>

            {isListVisible && debouncedKeyword && Array.isArray(list) && list.length > 0 && (
              <ul className='absolute z-10 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg'>
                {list.map((item) => (
                  <li
                    key={item.orgCd}
                    onClick={() => handleSelectAgency(item)}
                    className='cursor-pointer border-b p-3 last:border-b-0 hover:bg-gray-100'>
                    <div className=''>{item.orgName}</div>
                    <div className='text-xs text-gray-500'>{item.zipAddr}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className=''>
          <div>
            <label className='text-sm text-gray-700'>
              주소<span className='text-xs text-blue-500'>●</span>
            </label>
            <div className=''>
              <Input
                {...register('zipAddr')}
                readOnly
                className='bg-gray-100 px-4 py-3 text-gray-700'
                placeholder='기관을 선택하면 자동 입력됩니다'
              />

              <Input
                {...register('dtlAddr')}
                readOnly
                className='bg-gray-100 px-4 py-3 text-gray-700'
                placeholder='상세 주소'
              />
            </div>
          </div>

          <div>
            <label className='text-sm text-gray-700'>
              전화번호<span className='text-xs text-blue-500'>●</span>
            </label>
            <Input
              {...register('tel')}
              readOnly
              className='bg-gray-100 px-4 py-3 text-gray-700'
              placeholder='00(0)-000(0)-0000'
            />
          </div>
        </div>
      </div>

      <div className='bg-white p-4'>
        <Button
          onClick={() => {
            navigator('/agency-signup/step2');
          }}>
          다음
        </Button>
      </div>
    </div>
  );
}
