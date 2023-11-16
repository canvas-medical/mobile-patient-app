import { useQuery, useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { getToken } from './access-token';

export enum QuestionnaireIds {
  'Alcohol, Tobacco, and Other Substances' = 'c8e0a3f7-9f51-47d3-9562-996b619b25e3'
}

async function getQuestionnaires() {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Questionnaire`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json;
}

export function useQuestionnaires() {
  const questionnairesQuery = useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => getQuestionnaires(),
  });
  return questionnairesQuery;
}

async function getQuestionnaire(id: string) {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Questionnaire/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json;
}

export function useQuestionnaire(id: string) {
  const questionnairesQuery = useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => getQuestionnaire(id),
  });
  return questionnairesQuery;
}

async function questionnaireSubmit(data) {
  const token = await getToken();
  console.log(data);
  const patientId = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/QuestionnaireResponse`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      resourceType: 'QuestionnaireResponse',
      questionnaire: data.questionnaireId,
      status: 'completed',
      subject: {
        reference: patientId,
        type: 'Patient'
      },
      author: {
        reference: patientId,
        type: 'Patient'
      },
      item: Object.keys(data.formData).map((key) => {
        // TODO: tomorrow I need to find the values in the original dataset because they need so much data posted over, not just IDs
        const isCode = false;
        const answer = isCode ? { valueCoding: { code: sanitized[0], system: 'http://loinc.org' } } : { valueText: data.formData[key] };
        console.log(isCode);
        return {
          linkId: key,
          answer: [
            answer
          ]
        };
      })
    })
  });
  const Json = await res.json();
  console.log(Json);
}

export function useQuestionnaireSubmit() {
  return useMutation({
    mutationFn: (data: {formData: {}, questionnaireData: {}}) => questionnaireSubmit(data),
    // onSuccess: () => router.push('records'),
    onError: (e) => {
      console.log(e);
      Alert.alert(
        'Error',
        'There was an error submitting the form. Please try again.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
