import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves the conditions for a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of condition objects.
 */
async function getConditions() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Condition?patient=Patient/${patientID}`, {
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
 * Custom hook for fetching conditions data.
 *
 * @returns {QueryResult} The result of the query.
 */
export function useConditions() {
  return useQuery({
    queryKey: ['conditions'],
    queryFn: () => getConditions(),
  });
}
