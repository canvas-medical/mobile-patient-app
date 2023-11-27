import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';

async function getDocumentReferences() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/DocumentReference?subject=Patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json;
}

export function useDocumentReferences() {
  const documentReferencesQuery = useQuery({
    queryKey: ['documentReferences'],
    queryFn: () => getDocumentReferences(),
  });
  return documentReferencesQuery;
}
