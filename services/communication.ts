import { useMutation, useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { ApiError } from '@interfaces';
import { getToken } from './access-token';

async function getCommunication() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const createFetchRequest = async (params: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Communication${params}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      }
    });
    return response.json();
  };

  const fromRes = await createFetchRequest(`?sender=Patient/${patientId}`);
  const toRes = await createFetchRequest(`?recipient=Patient/${patientId}`);

  const fromArray = fromRes?.entry || [];
  const toArray = toRes?.entry || [];
  const allMessages = [...fromArray, ...toArray];

  return allMessages.sort((a, b) => {
    const aDate = new Date(a.resource.sent || a.resource.received);
    const bDate = new Date(b.resource.sent || b.resource.received);
    return aDate.getTime() - bDate.getTime();
  });
}

export function useCommunication() {
  return useQuery({
    queryKey: ['communications'],
    queryFn: () => getCommunication(),
  });
}

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
            reference: 'Practitioner/3b4f8231a0dd4330927b8a8e702ce36b'
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
}

export function useCommunicationSubmit() {
  return useMutation({
    mutationFn: (message: string) => communicationSubmit(message),
    onError: (e) => {
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
