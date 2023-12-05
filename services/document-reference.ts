import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function getDocumentReferences(type?: 'labreport' | 'imagingreport' | 'educationalmaterial' | 'invoicefull') {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DocumentReference?${type ? `category=${type}&` : ''}patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  return res.json();
}

export function useDocumentReferences(type?: 'labreport' | 'imagingreport' | 'educationalmaterial' | 'invoicefull') {
  return useQuery({
    queryKey: [type || 'documentReferences'],
    queryFn: () => getDocumentReferences(type),
  });
}
