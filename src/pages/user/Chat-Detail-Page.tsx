import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { MatchingCard } from '@/components/consultation/MatchingCard';

export default function ChatDetailPage() {
  const [option, setOption] = useState<'resume' | 'matchingInfo'>('resume');

  return (
    <div className='flex flex-col'>
      {/* 헤더 영역 */}
      <div className='flex items-center pb-4'>
        <span className='ml-2 text-xl font-bold'>상담 내역 상세</span>
      </div>

      {/* 탭 메뉴 */}
      <div className='flex py-3'>
        <div
          onClick={() => setOption('resume')}
          className={`flex flex-1 cursor-pointer justify-center border-b-2 transition-colors ${
            option === 'resume' ? 'border-b-blue-400 text-black' : 'border-gray-100 text-gray-400'
          }`}>
          <span className={`font-medium ${option === 'resume' ? 'font-bold' : ''}`}>이력서</span>
        </div>
        <div
          onClick={() => setOption('matchingInfo')}
          className={`flex flex-1 cursor-pointer justify-center border-b-2 transition-colors ${
            option === 'matchingInfo'
              ? 'border-b-blue-400 text-black'
              : 'border-gray-100 text-gray-400'
          }`}>
          <span className={`font-medium ${option === 'matchingInfo' ? 'font-bold' : ''}`}>
            매칭 정보
          </span>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      {option === 'resume' && (
        <div className='flex-1'>
          <div className='flex justify-between px-4 pb-8'>
            <span className='text-sm font-bold text-gray-800'>노원어르신일자리지원센터</span>
            <span className='text-xs text-gray-400'>작성일: 2025.11.20</span>
          </div>

          <div className='flex flex-col gap-8 px-5 pb-10'>
            {/* 프로필 섹션 */}
            <section>
              <div className='mb-6 flex items-end gap-2'>
                <h1 className='text-3xl font-bold'>김순자</h1>
                <span className='mb-1 text-gray-600'>여성 / 1956년생</span>
              </div>

              <div className='space-y-3 text-gray-700'>
                <div className='flex items-center gap-3'>
                  <Mail className='h-5 w-5 text-blue-400' />
                  <span className='text-gray-400'>이메일</span>
                  <span>sunja56@kakao.com</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='h-5 w-5 text-blue-400' />
                  <span className='text-gray-400'>연락처</span>
                  <span>010-0000-0000</span>
                </div>
                <div className='flex items-start gap-3'>
                  <MapPin className='mt-0.5 h-5 w-5 text-blue-400' />
                  <span className='text-gray-400'>주소</span>
                  <span>
                    서울시 중랑구 봉화산로56길 51 (신내동)
                    <br />
                    101동 403호
                  </span>
                </div>
              </div>
            </section>

            {/* 구분선 */}
            <div className='border-b border-dashed border-gray-200' />

            {/* 학력/자격 섹션 */}
            <section>
              <h2 className='mb-4 text-lg font-bold'>학력•자격</h2>
              <div className='space-y-3 text-sm'>
                <div className='flex'>
                  <span className='w-24 text-gray-400'>최종 학력</span>
                  <span className='text-gray-800'>대학(2,3년제) 졸업</span>
                </div>
                <div className='flex'>
                  <span className='w-24 text-gray-400'>자격•능력</span>
                  <span className='text-gray-800'>2급 생활스포츠지도사</span>
                </div>
              </div>
            </section>

            {/* 구분선 */}
            <div className='border-b border-dashed border-gray-200' />

            {/* 경력사항 섹션 (타임라인) */}
            <section>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-bold'>경력사항</h2>
                <span className='text-sm font-medium text-blue-500'>10년 6개월</span>
              </div>

              <div className='relative ml-1.5 space-y-8 border-l-2 border-blue-100 py-1 pl-6'>
                {/* 경력 1 */}
                <div className='relative'>
                  <span className='absolute top-1.5 -left-[31px] box-content h-3 w-3 rounded-full border-2 border-white bg-blue-400 shadow-sm'></span>
                  <p className='mb-1 text-xs text-gray-400'>
                    1990.03 ~ 1998.08 <span className='ml-1 text-blue-400'>8년 6개월</span>
                  </p>
                  <p className='font-bold text-gray-800'>
                    국민체육진흥공단 <span className='text-sm font-normal'>(정규직)</span>
                  </p>
                  <p className='text-sm text-gray-500'>일반직 7급</p>
                </div>

                {/* 경력 2 */}
                <div className='relative'>
                  <span className='absolute top-1.5 -left-[31px] box-content h-3 w-3 rounded-full border-2 border-white bg-blue-400 shadow-sm'></span>
                  <p className='mb-1 text-xs text-gray-400'>
                    2012.05 ~ 2013.04 <span className='ml-1 text-blue-400'>1년 0개월</span>
                  </p>
                  <p className='font-bold text-gray-800'>
                    퍼스트 필라테스 <span className='text-sm font-normal'>(계약직)</span>
                  </p>
                  <p className='text-sm text-gray-500'>일반 강사</p>
                </div>
              </div>
            </section>

            {/* 구분선 */}
            <div className='border-b border-dashed border-gray-200' />

            {/* 희망 근무 조건 섹션 */}
            <section>
              <h2 className='mb-4 text-lg font-bold'>희망 근무 조건</h2>
              <div className='space-y-4 text-sm'>
                <div className='flex items-center'>
                  <span className='w-24 text-gray-400'>근무 지역</span>
                  <span className='font-medium text-gray-800'>서울시 중랑구</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-24 text-gray-400'>근무 형태</span>
                  <span className='font-medium text-gray-800'>계약직</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-24 text-gray-400'>직종</span>
                  <span className='font-medium text-gray-800'>일반 행정</span>
                </div>
                <div className='flex items-center'>
                  <span className='w-24 text-gray-400'>근무 기간</span>
                  <span className='font-medium text-gray-800'>6개월 이상</span>
                </div>
              </div>
            </section>

            {/* 구분선 */}
            <div className='border-b border-dashed border-gray-200' />

            {/* 기타 섹션 */}
            <section>
              <h2 className='mb-4 text-lg font-bold'>기타</h2>
              <p className='text-sm leading-relaxed text-gray-800'>
                노화로 인해 소통이 어려워져, 민원 업무는 최대한 피하고자 합니다.
              </p>
            </section>
          </div>
        </div>
      )}

      {option === 'matchingInfo' && (
        <div className='flex-1 px-4 pb-8'>
          {/* 매칭 결과 섹션 */}
          <section className='mb-8'>
            <h2 className='mb-3 py-3 text-lg font-medium'>매칭 결과</h2>
            <MatchingCard
              company='국립국제교육원'
              title='2025년 제9차 국립국제교육원 공무직 근로자(경비원_글로벌역량지원센터(제주)) 채용 공고'
              location='서울시 강남구'
              date='~ 2025.11.18'
            />
          </section>

          {/* AI 추천 목록 섹션 */}
          <section>
            <h2 className='mb-3 text-lg font-medium'>AI 추천 목록</h2>
            <div className='flex flex-col gap-3'>
              <MatchingCard
                company='국립국제교육원'
                title='2025년 제9차 국립국제교육원 공무직 근로자(경비원_글로벌역량지원센터(제주)) 채용 공고'
                location='서울시 강남구'
                date='~ 2025.11.18'
              />

              <MatchingCard
                company='(주)다전디자인그룹'
                title='목동현대하이페리온아파트 내부 미화원 모집(복지카드소지자 우대)'
                location='서울시 서초구'
                date='~ 2025.11.25'
              />

              <MatchingCard
                company='(주)다전디자인그룹'
                title='4층짜리 근린생활 빌딩관리하실 분'
                location='서울시 서초구'
                date='마감'
                badge='건물/시설 관리'
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
