import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves the procedures associated with a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of procedure objects.
 */
async function getProcedures() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Procedure?patient=Patient/${patientId}&_count=100&_offset=0`, {
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
 * Custom hook for fetching procedures data that handles fetch states, errors, and caching automatically.
 *
 * @returns {QueryResult} The result of the query for procedures.
 */
export function useProcedures() {
  return useQuery({
    queryKey: ['procedures'],
    queryFn: () => getProcedures(),
  });
}
