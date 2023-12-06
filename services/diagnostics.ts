import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

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
  return json.entry.map((entry) => entry.resource).filter((resource) => resource.status === 'final' && !resource.dataAbsentReason);
}

export function useDiagnostics() {
  const diagnosticQuery = useQuery({
    queryKey: ['diagnostics'],
    queryFn: () => getDiagnostics(),
  });
  return diagnosticQuery;
}

async function getDiagnosticURI(id: string) {
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

export function useDiagnosticURI(id: string) {
  const diagnosticQuery = useQuery({
    queryKey: [`diagnostic-id: ${id}`],
    queryFn: () => getDiagnosticURI(id),
  });
  return diagnosticQuery;
}
