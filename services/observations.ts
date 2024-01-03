import { useQuery } from '@tanstack/react-query';
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
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Observation?category=vital-signs&patient=Patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource).filter((resource) => resource.status === 'final' && !resource.dataAbsentReason) || [];
}

/**
 * Custom hook for fetching observations data that handles fetch states, errors, and caching automatically.
 *
 * @returns {QueryResult} The result of the query for observations.
 */
export function useObservations() {
  return useQuery({
    queryKey: ['observations'],
    queryFn: () => getObservations(),
  });
}
