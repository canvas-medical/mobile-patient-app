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
  return res.ok ? res.text() : 'Something went wrong, please try again';
}

export function useOpenAiSummary(id: string, resourceType: string, description: string, codes: { code: string, system: string}[]) {
  return useQuery({
    queryKey: [`openai-summary-${id}`],
    queryFn: () => getOpenAiSummary(resourceType, description, codes)
  });
}
