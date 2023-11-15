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
  const patientId = await SecureStore.getItemAsync('patient_id');
  // const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/QuestionnaireResponse`, {
  console.log({
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
      item: [
        {
          linkId: 'e2e5ddc3-a0ec-4a1b-9c53-bf2e2e990fe1',
          text: 'Tobacco status',
          answer: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '8517006',
                display: 'Former user'
              }
            }
          ]
        },
        {
          linkId: 'd210dc3a-3427-4f58-8707-3f38393a8416',
          text: 'Tobacco type',
          answer: [
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '722496004',
                display: 'Cigarettes'
              }
            },
            {
              valueCoding: {
                system: 'http://snomed.info/sct',
                code: '722498003',
                display: 'eCigarette'
              }
            }
          ]
        },
        {
          linkId: 'a656c6c8-ecea-403f-a430-f80899f26914',
          text: 'Tobacco comment',
          answer: [
            {
              valueString: 'Yep'
            }
          ]
        }
      ]
    })
  });
}

export function useQuestionnaireSubmit() {
  return useMutation({
    mutationFn: (data) => questionnaireSubmit(data),
    onSuccess: () => router.push('records'),
    onError: () => {
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
