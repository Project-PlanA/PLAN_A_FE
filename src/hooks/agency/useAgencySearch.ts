import { useMutation } from '@tanstack/react-query';
import { searchAgencies, getNearbyAgencies } from '../../apis/agencies';
import type { AgencySummary } from '../../types/agency';

export function useAgencySearch() {
  return useMutation<AgencySummary[], Error, string>({
    mutationFn: async (keyword) => {
      const { data } = await searchAgencies(keyword);
      return data;
    },
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
