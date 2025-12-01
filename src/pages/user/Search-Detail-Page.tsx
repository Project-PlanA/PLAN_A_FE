import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { fetchJobDetail } from '../../apis/agencies';
import type { JobDetail } from '../../types/agency';

export default function SearchDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadDetail = async () => {
      try {
        const res = await fetchJobDetail(id);
        setJob(res.data);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <PageWrapper
        title='채용 공고 상세'
        content='불러오는 중입니다...'
      />
    );
  }

  if (!job) {
    return (
      <PageWrapper
        title='채용 공고 상세'
        content='공고를 찾을 수 없습니다.'
      />
    );
  }

  return (
    <div className='mx-auto flex min-h-screen w-full max-w-[390px] flex-col'>
      <header className='flex items-center bg-[#00a1ff] px-5 pt-4 pb-3'>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='mr-2 flex h-8 w-8 items-center justify-center rounded-full'>
          <ChevronLeft className='h-4 w-4 text-white' />
        </button>
        <h1 className='text-base font-semibold text-white'>채용 공고 상세</h1>
      </header>

      <section className='bg-[#00a1ff] px-5 pb-4 text-white'>
        <div className='px-4 py-4'>
          <p className='text-[13px] opacity-80'>{job.oranNm}</p>
          <h2 className='mt-1 text-[17px] leading-snug font-semibold'>{job.recrtTitle}</h2>
          <p className='mt-3 text-right text-[12px] opacity-80'>~ {job.toDd}</p>
        </div>
      </section>

      <section className='flex-1 rounded-t-[16px] bg-white px-5 pt-4 pb-10'>
        <div className='mb-6'>
          <h3 className='mb-3 text-[14px] font-semibold text-[#111827]'>모집 정보</h3>
          <div className='space-y-2'>
            <DetailRow
              label='고용 형태'
              value={job.emplymShpNm}
            />
            <DetailRow
              label='직종'
              value={job.jobclsNm}
            />
            <DetailRow
              label='모집 인원'
              value={job.clltPrnnum}
            />
            <DetailRow
              label='지원 조건'
              value={job.detCnts}
            />
          </div>
        </div>

        <div className='mb-6 border-t border-gray-100 pt-4'>
          <h3 className='mb-3 text-[14px] font-semibold text-[#111827]'>근무지 정보</h3>
          <DetailRow
            label='주소'
            value={job.plDetAddr}
          />
        </div>

        <div className='border-t border-gray-100 pt-4'>
          <h3 className='mb-3 text-[14px] font-semibold text-[#111827]'>접수 및 문의</h3>
          <div className='space-y-2'>
            <DetailRow
              label='접수 마감'
              value={job.toDd}
            />
            <DetailRow
              label='접수 방법'
              value={job.acptMthd}
            />
            <DetailRow
              label='연락처'
              value={job.clerkContt}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function PageWrapper({ title, content }: { title: string; content: string }) {
  const navigate = useNavigate();

  return (
    <div className='mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F5F7FB]'>
      <header className='flex items-center px-5 pt-4 pb-3'>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/5'>
          <ChevronLeft className='h-4 w-4 text-gray-700' />
        </button>
        <h1 className='text-base font-semibold text-[#000000]'>{title}</h1>
      </header>

      <div className='flex flex-1 items-center justify-center text-sm text-gray-500'>{content}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='mb-2 flex'>
      <span className='w-24 text-[13px] text-gray-400'>{label}</span>
      <span className='text-[13px] text-[#374151]'>{value}</span>
    </div>
  );
}
