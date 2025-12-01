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
// 채용 공고 목록 타입
export interface JobSummary {
  jobId: string;
  oranNm: string; 
  recrtTitle: string; 
  jobclsNm: string;
  region: string; 
  toDd: string; 
  deadline: string;
  createDy: string; 
}
// 채용 공고 상세 타입
export interface JobDetail {
  jobId: string;
  recrtTitle: string;
  oranNm: string;
  toDd: string;
  deadline: string;
  emplymShpNm: string;
  jobclsNm: string;
  clltPrnnum: string;
  detCnts: string;
  etcItm: string;
  plDetAddr: string;
  plbizNm: string;
  acptMthd: string;
  clerkContt: string;
  createDy: string;
}