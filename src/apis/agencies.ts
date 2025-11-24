import { instance } from "./instance";
import type { AgencySummary, AgencyDetail } from "../types/agency";

// 기관명 검색
export const searchAgencies = (keyword: string) =>
  instance.get<AgencySummary[]>("/api/agencies/search", {
    params: { keyword },
  });

// 기관 선택 후 상세 정보
export const getAgencyDetail = (orgCd: string) =>
  instance.get<AgencyDetail>(`/api/agencies/${orgCd}`);

// 근처 기관 조회
export const getNearbyAgencies = (params: {
  lat: number;
  lng: number;
}) =>
  instance.get<AgencySummary[]>("/api/agencies/location/nearby", {
    params,
  });
