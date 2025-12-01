import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import SearchBar from '../../components/common/SearchBar';
import { fetchJobList, searchJobs } from '../../apis/agencies';
import type { JobSummary } from '../../types/agency';

export default function SearchPage() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const loadList = async () => {
    setLoading(true);
    try {
      const res = await fetchJobList();
      setJobs(res.data.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleSearch = async (value: string) => {
    setKeyword(value);
    if (!value.trim()) {
      loadList();
      return;
    }

    if (value.trim().length < 2) return;

    setLoading(true);
    try {
      const res = await searchJobs(value);
      setJobs(res.data.data.items);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F5F7FB]'>
      <header className='bg-white px-5 pt-4 pb-3'>
        <h1 className='text-lg font-semibold text-[#000000]'>채용 공고</h1>
        <div className='mt-3'>
          <SearchBar
            value={keyword}
            onChange={handleSearch}
            placeholder='지역, 회사명, 직무 검색'
          />
        </div>
      </header>

      <div className='flex items-center justify-between px-5 pt-3 text-xs text-gray-500'>
        <span>{jobs.length}건의 채용 공고</span>
        <div className='flex items-center gap-1'>
          <span className='inline-block h-2 w-2 rounded-full bg-[#00c4ff]'></span>
          <span>최신순</span>
        </div>
      </div>

      <div className='mt-1 h-[calc(100vh-150px)] w-full'>
        <div className='h-full w-full overflow-y-auto px-5 pt-2 pb-24'>
          {loading && <p className='py-4 text-center text-sm'>불러오는 중...</p>}

          {!loading &&
            jobs.map((job) => (
              <article
                key={job.jobId}
                className='mb-3 rounded-[10px] bg-white p-4 shadow'
                onClick={() => navigate(`/searchpage/${job.jobId}`)}>
                <p className='mt-2 text-[12px] text-[#969696]'>{job.oranNm}</p>
                <h2 className='mt-1 text-[15px] font-semibold'>{job.recrtTitle}</h2>
                <div className='mt-3 flex justify-between text-[11px] text-[#969696]'>
                  <span>{job.region}</span>
                  <span>~ {job.toDd}</span>
                </div>
              </article>
            ))}

          {!loading && jobs.length === 0 && (
            <p className='py-4 text-center text-sm text-gray-500'>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
