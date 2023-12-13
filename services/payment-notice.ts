import { useMutation, useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { ApiError } from '@interfaces';
import { getToken } from './access-token';

async function getPaymentNotices() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/PaymentNotice?request=Patient/${patientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource).reverse() || [];
}

export function usePaymentNotices() {
  return useQuery({
    queryKey: ['paymentNotices'],
    queryFn: () => getPaymentNotices(),
  });
}

// Amount is in dollars, formatted as a float
async function paymentNoticeSubmit(amount: string) {
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
          reference: `Patient/${patientId}`
        },
        created: new Date(),
        payment: {},
        recipient: {},
        amount: {
          value: amount,
          currency: 'USD'
        }
      }
    )
  });
  const Json: null | ApiError = await res.json();
  console.log('payment notice json', Json);
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
}

export function usePaymentNoticeSubmit() {
  return useMutation({
    mutationFn: (amount: string) => paymentNoticeSubmit(amount),
    onError: (e) => {
      // TODO: release charge if something goes wrong here
      Alert.alert(
        'Payment Refunded',
        e.message,
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
