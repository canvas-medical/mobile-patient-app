import { useQuery } from '@tanstack/react-query';

async function getOpenAiSummary(record: string) {
  console.log(process.env.EXPO_PUBLIC_OPENAI_API_URL);
  const res = await fetch(`${process.env.EXPO_PUBLIC_OPENAI_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    },
    body: JSON.stringify(record)
  });
  // console.log('STATUS', res.status);
  // console.log('TEXT', res.statusText);
  // console.log('RES BODY', res.body);
  // console.log('RES', res);
  const json = await res.json();
  console.log('JSON', json);
  if (!res.ok) throw new Error('Something went wrong with the OpenAI request. Please try again.');
  return json;
}

export function useOpenAiSummary(record: string) {
  return useQuery({
    queryKey: ['openai-summary-2'],
    queryFn: () => getOpenAiSummary(record),
  });
}
