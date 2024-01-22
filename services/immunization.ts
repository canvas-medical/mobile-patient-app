import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves the immunization records for a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of immunization objects.
 */
async function getImmunizations() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Immunization?patient=Patient/${patientId}&_count=100&_offset=0`, {
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
 * Retrieves a list of immunizations using the `getImmunizations` function.
 *
 * @returns {QueryResult} The result of the query containing the immunizations.
 */
export function useImmunizations() {
  return useQuery({
    queryKey: ['immunizations'],
    queryFn: () => getImmunizations(),
  });
}
