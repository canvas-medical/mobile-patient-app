import { useQuery } from '@tanstack/react-query';

async function getOpenAiSummary(resourceType: string, description: string, codes: {code: string, system: string}[]) {
  const codesObject = codes.reduce((acc, obj) => ({ ...acc, [obj.system]: obj.code }), {});
  const res = await fetch(`${process.env.EXPO_PUBLIC_OPENAI_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    },
    body: JSON.stringify({ resourceType, properties: { description, codes: codesObject } })
  });
  if (!res.ok) throw new Error('Something went wrong with the OpenAI request. Please try again.');
  return res.text();
}

export function useOpenAiSummary(id: string, resourceType: string, description: string, codes: { code: string, system: string}[]) {
  return useQuery({
    queryKey: [`openai-summary-${id}`],
    queryFn: () => getOpenAiSummary(resourceType, description, codes)
  });
}
