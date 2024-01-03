import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves the goals for a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of goal objects.
 */
async function getGoals() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Goal?patient=Patient/${patientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

/**
 * Custom hook for fetching goals data.
 *
 * @returns {QueryResult} The result of the query for goals.
 */
export function useGoals() {
  return useQuery({
    queryKey: ['goals'],
    queryFn: () => getGoals(),
  });
}
