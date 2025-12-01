import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { MapPin, Phone, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { instance } from '../../apis/instance';
import type { AgencySummary } from '../../types/agency';

type AgencyDetail = AgencySummary & {
  zipAddr?: string;
};

export default function AgencyReservationPage() {
  const navigate = useNavigate();
  const { orgCd } = useParams<{ orgCd: string }>();

  const [agency, setAgency] = useState<AgencyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const MORNING_TIMES = ['10:00', '10:30', '11:00', '11:30'];
  const AFTERNOON_TIMES = [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ];

  useEffect(() => {
    if (!orgCd) return;

    let cancelled = false;

    const fetchAgency = async () => {
      setLoading(true);
      try {
        const res = await instance.get<AgencyDetail>(`/api/agencies/${orgCd}`);
        if (cancelled) return;
        setAgency(res.data);
      } catch {
        if (cancelled) return;
        setAgency(null);
      }
      if (!cancelled) {
        setLoading(false);
      }
    };

    fetchAgency();

    return () => {
      cancelled = true;
    };
  }, [orgCd]);

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-[#F5F7FB]">
      <header className="flex items-center bg-[#00a1ff] px-5 pt-4 pb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mr-2 flex h-8 w-8 items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <h1 className="text-base font-semibold text-white">기관 상담 예약</h1>
      </header>

      <section className="bg-[#00a1ff] px-5 pb-4">
        <div className="px-4 py-4 text-white">
          <h2 className="mt-1 text-[17px] font-semibold">
            {loading ? '기관 정보를 불러오는 중입니다...' : agency?.orgName ?? ''}
          </h2>

          <div className="mt-3 flex items-start gap-2 text-[13px] leading-[18px]">
            <MapPin className="mt-[2px] h-4 w-4 shrink-0" />
            <span>{agency?.dtlAddr || agency?.zipAddr || ''}</span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-[13px]">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{agency?.tel ?? ''}</span>
          </div>
        </div>
      </section>

      <section className="flex-1 rounded-t-[16px] bg-white px-5 pt-4 pb-28">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ko}
          className="w-full rounded-[16px] bg-white"
          formatters={{
            formatCaption: (month, options) => format(month, 'yyyy년 MM월', options),
          }}
        />

        <Separator className="my-4" />


        <div className="mb-3">
          <p className="mb-2 text-sm font-medium text-gray-900">오전</p>
          <div className="flex flex-wrap gap-2">
            {MORNING_TIMES.map((time) => {
              const selected = selectedTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`h-9 min-w-[72px] rounded-full border px-3 text-sm ${
                    selected
                      ? 'border-transparent bg-[#1295FF] text-white'
                      : 'border-[#E2E8F0] bg-white text-gray-800'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-3">
          <p className="mb-2 text-sm font-medium text-gray-900">오후</p>
          <div className="flex flex-wrap gap-2">
            {AFTERNOON_TIMES.map((time) => {
              const selected = selectedTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`h-9 min-w-[72px] rounded-full border px-3 text-sm ${
                    selected
                      ? 'border-transparent bg-[#1295FF] text-white'
                      : 'border-[#E2E8F0] bg-white text-gray-800'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-[390px] -translate-x-1/2 bg-white px-5 pt-3 pb-6 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <Button
          disabled={!date || !selectedTime}
          className="h-12 w-full rounded-xl bg-[#00a1ff] text-base font-medium hover:bg-[#0d7fe0]"
          onClick={() => {
            if (!date || !selectedTime) return;
          }}
        >
          예약 완료
        </Button>
      </div>
    </div>
  );
}
