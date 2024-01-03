import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves the invoices for a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of invoice objects.
 */
async function getInvoices() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DocumentReference?subject=Patient/${patientID}&category=invoicefull`, {
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
 * Custom hook for fetching invoices data.
 *
 * @returns {QueryResult} The result of the query for invoices.
 */
export function useInvoices() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: () => getInvoices(),
  });
}
