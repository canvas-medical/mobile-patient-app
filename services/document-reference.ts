import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function getDocumentReferences(type?: 'http://loinc.org|94093-2'|'imagingreport'|'educationalmaterial'|'invoicefull') {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DocumentReference?subject=Patient/${patientID}${type ? `?type=${type}` : ''}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  return res.json();
}

export function useDocumentReferences(type?: 'http://loinc.org|94093-2'|'imagingreport'|'educationalmaterial'|'invoicefull') {
  return useQuery({
    queryKey: ['documentReferences'],
    queryFn: () => getDocumentReferences(type),
  });
}
