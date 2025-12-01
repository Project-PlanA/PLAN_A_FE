import Button from '../common/Button';
import type { AgencySummary } from '../../types/agency';
import LocationIcon from '../../assets/LocationIcon.png';
import PhoneIcon from '../../assets/PhoneIcon.png';

type Props = {
  agency: AgencySummary;
  onClickAgency: (orgCd: string) => void;
  disabled?: boolean;
};

export default function AgencyListItem({
  agency,
  onClickAgency,
  disabled = false,
}: Props) {
  return (
    <article className="mx-auto mb-3 w-[350px] rounded-[10px] bg-white p-4 shadow-[0_0_5px_rgba(0,0,0,0.05)]">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold text-[#000000]">
          {agency.orgName}
        </h2>

        {agency.distanceText && (
          <span className="ml-2 text-[11px] text-[#969696]">
            {agency.distanceText}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start gap-2">
        <img src={LocationIcon} className="mt-0.5 h-4 w-4" />
        <p className="text-[13px] leading-[18px] text-[#000000]">
          {agency.dtlAddr || agency.zipAddr}
        </p>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <img src={PhoneIcon} className="h-4 w-4" />
        <p className="text-[13px] text-[#000000]">{agency.tel}</p>
      </div>

      <div className="mt-4 flex justify-center">
        {disabled ? (
          <Button disabled>예약 완료</Button>
        ) : (
          <Button onClick={() => onClickAgency(agency.orgCd)}>
            상담 예약
          </Button>
        )}
      </div>
    </article>
  );
}
