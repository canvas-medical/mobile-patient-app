import * as SecureStore from 'expo-secure-store';
import { useQuery } from '@tanstack/react-query';
import { getToken } from './access-token';

/**
 * Retrieves a questionnaire by its ID from the FHIR API.
 *
 * @returns {Promise<Object>} A promise that resolves to an array of questionnaire responses.
 * @throws An error if the request fails or the response is not successful.
 */
async function getQuestionnaireResponses() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/QuestionnaireResponse?patient=Patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  if (!res.ok) throw new Error();
  const json = await res.json();
  console.log(json);
  return json;
}

/**
 * Custom hook to fetch all the patients questionnaire responses.
 *
 * @returns {QueryResult} The result of the query for the questionnaire responses.
 */
export function useQuestionnaireResponses() {
  return useQuery({
    queryKey: ['questionnaire-responses'],
    queryFn: () => getQuestionnaireResponses,
  });
}
