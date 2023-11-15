import { useQuery } from '@tanstack/react-query';
import { getToken } from './access-token';

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
