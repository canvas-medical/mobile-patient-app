import { useQuery } from '@tanstack/react-query';
import { getToken } from './access-token';

/**
 * Retrieves the location of a clinic using the FHIR API.
 *
 * @returns A string representing the clinic location in the format: "address line, city, state, postal code".
 */
async function getClinicLocation() {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Location/${process.env.EXPO_PUBLIC_CLINIC_ID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return `${json.address.line[0]}, ${json.address.city}, ${json.address.state}, ${json.address.postalCode}`;
}

/**
 * Custom hook to fetch the location of a clinic.
 *
 * @returns {QueryResult} The result of the query containing the clinic location.
 */
export function useClinicLocation() {
  // Normally, we would pass a clinic ID to this function, but since we only have one clinic,
  // we've hardcoded it as an env variable, EXPO_PUBLIC_CLINIC_ID.
  return useQuery({
    queryKey: ['clinic-location'],
    queryFn: () => getClinicLocation(),
  });
}
