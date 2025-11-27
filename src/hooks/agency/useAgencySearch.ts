import { useMutation, useQuery } from '@tanstack/react-query';
import { searchAgencies, getNearbyAgencies } from '../../apis/agencies';
import type { AgencySummary } from '../../types/agency';

export function useAgencySearch(keyword: string) {
  return useQuery<AgencySummary[], Error>({
    queryKey: ['agencies', 'search', keyword],
    queryFn: async () => {
      const { data } = await searchAgencies(keyword);
      return data;
    },
    enabled: !!keyword, // 검색어 비어있을 때 요청 x
  });
}

export function useNearbyAgencySearch() {
  return useMutation<AgencySummary[], Error, { lat: number; lng: number }>({
    mutationFn: async ({ lat, lng }) => {
      const res = await getNearbyAgencies({ lat, lng });
      return res.data;
    },
  });
}
