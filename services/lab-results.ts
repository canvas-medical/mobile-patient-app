import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function fetchReport(url: string, token: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const data = await response.json();
  return data.entry?.map((report: any) => report.resource) || [];
}

async function getLabResults() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const imagingReports = await fetchReport(`${apiUrl}/DocumentReference?patient/${patientID}&category=imagingreport`, token);
  const labReports = await fetchReport(`${apiUrl}/DocumentReference?patient/${patientID}&category=labreport`, token);
  const diagnosticsReports = await fetchReport(`${apiUrl}/DiagnosticReport?patient=Patient/${patientID}`, token);

  return [
    ...imagingReports,
    ...labReports,
    ...diagnosticsReports.map((report: any) => ({ ...report, date: report.issued })),
  ].sort((a: any, b: any) => (
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ));
}

export function useLabResults() {
  return useQuery({
    queryKey: ['lab-results'],
    queryFn: () => getLabResults(),
  });
}
