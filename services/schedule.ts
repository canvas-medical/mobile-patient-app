import { useQuery } from '@tanstack/react-query';
import { getToken } from './access-token';

/**
 * Retrieves the schedule data from the server.
 *
 * @returns {Promise<Array<any>>} A promise that resolves to an array of schedule resources.
 */
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

/**
 * Custom hook for fetching schedule data.
 *
 * @returns {QueryResult} The result of the query for schedules.
 */
export function useSchedule() {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(),
  });
}
