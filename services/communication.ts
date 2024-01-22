import { useMutation, useInfiniteQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { ApiError } from '@interfaces';
import Bugsnag from '@bugsnag/expo';
import { getToken } from './access-token';

/**
 * Retrieves the communication messages for a specific patient.
 *
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of communication message objects.
 */
async function getCommunication({ pageParam: offset }) {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Communication?patient=Patient/${patientID}&_count=100&_offset=${offset}`, {
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
 * Custom hook for fetching communication data using infinite query.
 *
 * @returns {InfiniteQueryResult} The result of the infinite query for the communication data.
 */
export function useCommunication() {
  return useInfiniteQuery({
    queryKey: ['communications'],
    queryFn: getCommunication,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < 100) return undefined;
      return lastPageParam + 100;
    },
  });
}

/**
 * Submits a communication message.
 *
 * @param message - The message to be submitted.
 * @throws Error if there is an issue with the API response.
 */
async function communicationSubmit(message: string) {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const isoString = new Date().toISOString();

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Communication`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      {
        resourceType: 'Communication',
        status: 'unknown',
        sent: isoString,
        received: isoString,
        recipient: [
          {
            reference: `Practitioner/${process.env.EXPO_PUBLIC_PRACTITIONER_ID}`,
          }
        ],
        sender: {
          reference: `Patient/${patientId}`
        },
        payload: [
          {
            contentString: message
          }
        ]
      }
    )
  });
  const Json: null | ApiError = await res.json();
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
  return res;
}

/**
 * A custom hook that returns a mutation function for submitting a communication message.
 *
 * @returns A mutation function that submits a communication message.
 */
export function useCommunicationSubmit() {
  return useMutation({
    mutationFn: (message: string) => communicationSubmit(message),
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        'There was an error sending the message. Please try again.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
