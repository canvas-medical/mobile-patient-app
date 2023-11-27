import { useMutation, useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { ApiError } from '@interfaces';
import { getToken } from './access-token';

async function getCommunication() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  console.log(`${process.env.EXPO_PUBLIC_API_URL}/Communication?recipient=Patient/${patientId}`);
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Communication?recipient=Patient/${patientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  return res.json();
}

export function useCommunication() {
  return useQuery({
    queryKey: ['communications'],
    queryFn: () => getCommunication(),
  });
}

async function sendCommunication(message: string) {
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
            reference: 'Practitioner/5eede137ecfe4124b8b773040e33be14'
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

export function useSendCommunication() {
  return useMutation({
    mutationFn: (message: string) => sendCommunication(message),
    onSuccess: () => router.push('records'),
    onError: (e) => {
      console.log(e);
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
