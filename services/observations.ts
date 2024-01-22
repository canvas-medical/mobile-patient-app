import { useInfiniteQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves observations for a specific patient.
 *
 * @returns {Promise<Array<Object>>} An array of observation resources.
 */
async function getObservations() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Observation?category=vital-signs&patient=Patient/${patientID}&_count=100&_offset=0`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) ?? [];
}

/**
 * Custom hook for fetching observation data using infinite query.
 *
 * @returns {InfiniteQueryResult} The result of the infinite query for the observation data.
 */
export function useObservations() {
  return useInfiniteQuery({
    queryKey: ['observations'],
    queryFn: getObservations,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < 100) return undefined;
      return lastPageParam + 100;
    },
  });
}
