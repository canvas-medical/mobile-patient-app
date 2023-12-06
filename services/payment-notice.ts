import { useMutation, useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { ApiError } from '@interfaces';
import { getToken } from './access-token';

async function getPaymentNotices() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/PaymentNotice?recipient=Patient/${patientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  return res.json();
}

export function usePaymentNotices() {
  return useQuery({
    queryKey: ['paymentNotices'],
    queryFn: () => getPaymentNotices(),
  });
}

async function paymentNoticeSubmit(value: number) {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/PaymentNotice`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      {
        resourceType: 'PaymentNotice',
        status: 'active',
        request: {
          reference: patientId,
        },
        created: new Date(),
        payment: {},
        recipient: {},
        amount: {
          value,
          currency: 'USD'
        }
      }
    )
  });
  const Json: null | ApiError = await res.json();
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
}

export function usePaymentNoticeSubmit() {
  return useMutation({
    mutationFn: (value: number) => paymentNoticeSubmit(value),
    onSuccess: () => router.push('appointments-medications'),
    onError: (e) => {
      Alert.alert(
        'Error',
        'There was an error submitting the payment. Please try again.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
