import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function getMedications() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/MedicationStatement?patient=Patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry.map((entry) => entry.resource);
}

export function useMedications() {
  const medicationsQuery = useQuery({
    queryKey: ['medications'],
    queryFn: () => getMedications(),
  });
  return medicationsQuery;
}
