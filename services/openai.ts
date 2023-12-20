import { useQuery } from '@tanstack/react-query';

async function getOpenAiSummary(resourceType: string, description: string, codes: {code: string, system: string}[]) {
  const codesObject = codes.reduce((acc, obj) => ({ ...acc, [obj.system]: obj.code }), {});
  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_OPENAI_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.EXPO_PUBLIC_OPENAI_API_KEY,
      },
      body: JSON.stringify({ resourceType, properties: { description, codes: codesObject } })
    });
    if (!res.ok) {
      throw new Error();
    }
    const text = await res.text();
    return JSON.parse(text);
  } catch (e) {
    throw new Error('Something went wrong, please try again later.');
  }
}

export function useOpenAiSummary(id: string, resourceType: string, description: string, codes: { code: string, system: string}[]) {
  // Setting stale time to 500000ms (5 minutes) to avoid hitting the OpenAI Microservice more than necessary
  return useQuery({
    queryKey: [`openai-summary-${id}`],
    queryFn: () => getOpenAiSummary(resourceType, description, codes),
    staleTime: 500000,
  });
}
