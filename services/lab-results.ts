import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

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

/**
 * Fetches a report from the specified URL using the provided token for authorization.
 *
 * @param url - The URL to fetch the report from.
 * @param token - The authorization token to use for the request.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of report resources.
 */
async function fetchReport(url: string, token: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json?.entry?.map((report: any) => report.resource) || [];
}

/**
 * Retrieves the lab results for a specific patient.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of lab result objects, sorted by date in descending order.
 */
async function getLabResults() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const imagingReports = await fetchReport(`${apiUrl}/DocumentReference?subject=Patient/${patientID}&category=imagingreport&_count=100&_offset=0`, token);
  const labReports = await fetchReport(`${apiUrl}/DocumentReference?subject=Patient/${patientID}&category=labreport&_count=100&_offset=0`, token);
  const diagnosticsReports = await fetchReport(`${apiUrl}/DiagnosticReport?patient=Patient/${patientID}&_count=100&_offset=0`, token);
  return [
    ...imagingReports,
    ...labReports,
    ...diagnosticsReports.map((report: any) => ({ ...report, date: report.issued })),
  ].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Custom hook for fetching lab results data that handles fetch states, errors, and caching automatically.
 *
 * @returns {QueryResult} The result of the query for lab results.
 */
export function useLabResults() {
  return useQuery({
    queryKey: ['lab-results'],
    queryFn: () => getLabResults(),
  });
}
