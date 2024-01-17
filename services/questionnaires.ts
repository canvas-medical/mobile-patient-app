import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useStateMachine } from 'little-state-machine';
import { ApiError, Question } from '@interfaces';
import Bugsnag from '@bugsnag/expo';
import { resetAction } from '@store';
import { getToken } from './access-token';

export enum QuestionnaireIds {
  'Alcohol, Tobacco, and Other Substances' = 'c8e0a3f7-9f51-47d3-9562-996b619b25e3'
}

/**
 * Retrieves a questionnaire by its ID from the FHIR API.
 *
 * @param id - The ID of the questionnaire to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the questionnaire object.
 * @throws An error if the request fails or the response is not successful.
 */
async function getQuestionnaire(id: string) {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Questionnaire/${id}`, {
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
 * Custom hook to fetch a questionnaire by its ID.
 *
 * @param id - The ID of the questionnaire to fetch.
 * @returns {QueryResult} The result of the query for the questionnaire.
 */
export function useQuestionnaire(id: string) {
  return useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => getQuestionnaire(id),
  });
}

/**
 * Submits a questionnaire response to the server.
 *
 * @param data - The data object containing the form data and questionnaire data.
 * @returns - A Promise that resolves when the questionnaire response is successfully submitted.
 * @throws - An error if there is an issue with submitting the questionnaire response.
 */

async function questionnaireSubmit(data: { formData: { key: string }; questionnaireData: { id: string, item: Question[] } }) {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');

  const answers = Object.keys(data?.formData).reduce((arr, key) => {
    if (!data?.formData[key]) return arr;

    const question = data?.questionnaireData?.item.find((item) => item.linkId === key);
    // For multiple-choice questions we need to return the code and system of the item(s) selected, for text fields we only need to return text
    // TODO: Add support for multi-select choice questions, these have repeat: true in the question object
    const choiceAnswer = question.type === 'choice' && question.answerOption.find((obj) => obj.valueCoding.code === data?.formData[key]);
    const answer = choiceAnswer || { valueString: data?.formData[key] };
    arr.push({
      linkId: key,
      text: question.text,
      answer: [
        answer
      ]
    });
    return arr;
  }, []);

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/QuestionnaireResponse`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      {
        resourceType: 'QuestionnaireResponse',
        questionnaire: `Questionnaire/${data?.questionnaireData?.id}`,
        status: 'completed',
        subject: {
          reference: `Patient/${patientId}`,
          type: 'Patient'
        },
        author: {
          reference: `Patient/${patientId}`,
          type: 'Patient'
        },
        item: answers
      }
    )
  });
  const Json: null | ApiError = await res.json();
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
}

/**
 * Custom hook for submitting a questionnaire response that handles fetch states and error handling automatically.
 *
 * @returns The mutation function for submitting the questionnaire.
 */
export function useQuestionnaireSubmit() {
  const { actions } = useStateMachine({ resetAction });
  return useMutation({
    mutationFn: (data: { formData: { key: string }; questionnaireData: { id: string, item: Question[] } }) => questionnaireSubmit(data),
    onSuccess: () => {
      actions.resetAction();
      router.push('(tabs)/my-health');
    },
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
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
