import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

/**
 * Retrieves diagnostic reports for a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of diagnostic reports.
 */
async function getDiagnostics() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DiagnosticReport?patient=Patient/${patientID}`, {
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
 * Custom hook for fetching diagnostics data that handles fetch states, errors, and caching automatically.
 *
 * @returns {QueryResult} The result of the query for diagnostics.
 */
export function useDiagnostics() {
  return useQuery({
    queryKey: ['diagnostics'],
    queryFn: () => getDiagnostics(),
  });
}

/**
 * Retrieves the URI of a diagnostic report by its ID.
 *
 * @param id - The ID of the diagnostic report.
 * @returns The URI of the diagnostic report.
 */
async function getDiagnosticURI(id: string) {
  if (!id) return null;
  const token = await getToken();
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DiagnosticReport/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await response.json();
  return json.presentedForm[0].url;
}

/**
 * Custom hook to fetch diagnostic URI based on the provided ID.
 *
 * @param id - The ID of the diagnostic.
 * @returns {QueryResult} The result of the query containing the diagnostic URI.
 */
export function useDiagnosticURI(id: string | null) {
  return useQuery({
    queryKey: [`diagnostic-id: ${id}`],
    queryFn: () => getDiagnosticURI(id),
  });
}
