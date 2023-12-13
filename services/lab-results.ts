import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function getLabResults() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const imaging = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DocumentReference?patient/${patientID}&category=imagingreport`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const lab = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DocumentReference?patient/${patientID}&category=labreport`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const diagnostics = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DiagnosticReport?patient=Patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const imagingReports = await imaging.json();
  const labReports = await lab.json();
  const diagnosticsReports = await diagnostics.json();
  return [
    ...imagingReports.entry?.map((report: any) => report.resource) || [],
    ...labReports.entry?.map((report: any) => report.resource) || [],
    ...diagnosticsReports.entry?.map((report: any) => ({ ...report.resource, date: report.resource.issued })) || [],
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
