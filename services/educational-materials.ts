import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves educational materials for a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of educational materials.
 */
async function getEducationalMaterials() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DocumentReference?subject=Patient/${patientID}&category=educationalmaterial`, {
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
 * Custom hook for fetching educational materials.
 *
 * @returns The result of the query.
 */
export function useEducationalMaterials() {
  return useQuery({
    queryKey: ['educational-materials'],
    queryFn: () => getEducationalMaterials(),
  });
}
