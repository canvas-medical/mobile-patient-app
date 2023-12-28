import { useQuery } from '@tanstack/react-query';
import { getToken } from './access-token';

async function getSchedule() {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Schedule`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

export function useSchedule() {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(),
  });
}
