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
  const body = {
    resourceType: 'QuestionnaireResponse',
    questionnaire: `Questionnaire/${data.questionnaireData.id}`,
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
      const question = data.questionnaireData.item.find((item) => item.linkId === key);
      // For multiple-choice questions we need to return the code nd system of the item(s) selected, for text fields we only need to return text
      const choiceAnswer = question.type === 'choice' && question.answerOption.find((obj) => obj.valueCoding.code === data.formData[key]);
      const answer = choiceAnswer || { valueString: data.formData[key] };
      return {
        linkId: key,
        text: question.text,
        answer: [
          answer
        ]
      };
    })
  };
  console.log(body);
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/QuestionnaireResponse`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body)
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
