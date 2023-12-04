import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function getImmunizations() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Immunization?patient=Patient/${patientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  return res.json();
}

export function useImmunizations() {
  return useQuery({
    queryKey: ['immunizations'],
    queryFn: () => getImmunizations(),
  });
}
