import * as SecureStore from 'expo-secure-store';
import { useQuery } from '@tanstack/react-query';
import { QuestionnaireResponse } from '@interfaces';
import { getToken } from './access-token';

/**
 * Retrieves all questionnaire responses for the patient from the FHIR API.
 *
 * @returns {Promise<QuestionnaireResponse[]>} A promise that resolves to an array of questionnaire responses.
 * @throws An error if the request fails or the response is not successful.
 */
async function getQuestionnaireResponses(): Promise<QuestionnaireResponse[]> {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/QuestionnaireResponse?patient=Patient/${patientID}&_count=100&_offset=0`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  if (!res.ok) throw new Error();
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

/**
 * Custom hook to fetch all the patients questionnaire responses.
 *
 * @returns {QueryResult} The result of the query for the questionnaire responses.
 */
export function useQuestionnaireResponses() {
  return useQuery({
    queryKey: ['questionnaire-responses'],
    queryFn: () => getQuestionnaireResponses(),
  });
}

/**
 * Retrieves a questionnaire by its ID from the FHIR API.
 *
 * @returns {Promise<QuestionnaireResponse>} A promise that resolves to an array of questionnaire responses.
 * @throws An error if the request fails or the response is not successful.
 */
async function getQuestionnaireResponse(id): Promise<QuestionnaireResponse> {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/QuestionnaireResponse/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  if (!res.ok) throw new Error();
  const json = await res.json();
  return json;
}

/**
 * Custom hook to fetch a questionnaire response.
 *
 * @returns {QueryResult} The result of the query for the questionnaire response.
 */
export function useQuestionnaireResponse(id: string) {
  return useQuery({
    queryKey: ['questionnaire-response'],
    queryFn: () => getQuestionnaireResponse(id),
  });
}
