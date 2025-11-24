import AgencyListItem from './AgencyListItem';
import type { AgencySummary } from '../../types/agency';

type Props = {
  isVisible: boolean;
  agencies: AgencySummary[];
  loading: boolean;
  keyword: string;
  resultCountLabel: string;
  onClickAgency: (orgCd: string) => void;
};

export default function LocationListSection({
  isVisible,
  agencies,
  loading,
  keyword,
  resultCountLabel,
  onClickAgency,
}: Props) {
  if (!isVisible) return null;

  const safeAgencies = Array.isArray(agencies) ? agencies : [];

  return (
    <>
      <div className="flex items-center justify-between px-5 pt-3 text-xs text-gray-500">
        <span>{resultCountLabel}</span>
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-gray-500"
        >
          <span>거리순</span>
        </button>
      </div>

      <div className="mt-1 h-[calc(100vh-176px)] w-full">
        <div className="h-full w-full overflow-y-auto px-5 pt-2 pb-24">
          {loading && (
            <p className="py-4 text-center text-sm text-gray-500">
              기관을 불러오는 중입니다...
            </p>
          )}

          {!loading && safeAgencies.length === 0 && keyword.trim().length >= 2 && (
            <p className="py-4 text-center text-sm text-gray-500">
              검색 결과가 없습니다.
            </p>
          )}

          {!loading &&
            safeAgencies.map((agency) => (
              <AgencyListItem
                key={agency.orgCd}
                agency={agency}
                onClickAgency={onClickAgency}
              />
            ))}
        </div>
      </div>
    </>
  );
}
