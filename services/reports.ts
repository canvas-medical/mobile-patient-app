import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function getReports() {
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
  const imagingReports = await imaging.json();
  const labReports = await lab.json();
  return [
    ...imagingReports.entry.map((report: any) => report.resource),
    ...labReports.entry.map((report: any) => report.resource),
  ].sort((a: any, b: any) => (
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ));
}

export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: () => getReports(),
  });
}
