import { useQuery } from '@tanstack/react-query';
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
