import { useQuery } from '@tanstack/react-query';

async function getOpenAiSummary(resourceType: string, description: string, hl7code: string, snomed: string) {
  // ICD10, CPT, SNOMED, LOINC, INTERNAL
  const body = await JSON.stringify({ resourceType, properties: { description, hl7_code: hl7code, snomed_code: snomed } });
  console.log('BODY', body);
  const res = await fetch(`${process.env.EXPO_PUBLIC_OPENAI_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    },
    body: JSON.stringify({ resourceType, properties: { description, hl7_code: hl7code, snomed_code: snomed } })
  });
  const text = await res.text();
  if (!res.ok) throw new Error('Something went wrong with the OpenAI request. Please try again.');
  return text;
}

export function useOpenAiSummary(id: string, resourceType: string, description: string, hl7code: string, snomed: string) {
  return useQuery({
    queryKey: [`openai-summary-${id}`],
    queryFn: () => getOpenAiSummary(resourceType, description, hl7code, snomed)
  });
}
