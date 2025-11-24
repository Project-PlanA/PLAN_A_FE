//기관 검색, 근처 기관 목록 조회시 사용
export interface AgencySummary {
  orgCd: string;
  orgName: string;
  zipAddr: string;
  dtlAddr: string;
  tel: string;
  lat?: number;
  lng?: number;
  distanceKm?: number;
  distanceText?: string;
}

//특정 기관 상세보기 페이지에서 사용
export interface AgencyDetail extends AgencySummary {
  orgType: string;
}
