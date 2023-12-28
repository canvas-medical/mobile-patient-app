import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import Bugsnag from '@bugsnag/expo';

export async function getPaymentIntent(cents: number) {
  const res = await fetch(`${process.env.EXPO_PUBLIC_STRIPE_API_URL}/payment_intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_STRIPE_API_KEY,
    },
    body: JSON.stringify({ amount: cents })
  });
  if (!res.ok) throw new Error('Something went wrong with the payment. Please try again.');
  const json = await res.json();
  return json;
}

async function paymentIntentCapture(id: string) {
  const res = await fetch(`${process.env.EXPO_PUBLIC_STRIPE_API_URL}/payment_intent`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_STRIPE_API_KEY,
    },
    body: JSON.stringify({ id })
  });
  const json = await res.json();
  if (!res.ok) throw new Error('Something went wrong with the payment. Please try again.');
  return json;
}

async function paymentIntentCancel(id: string) {
  const res = await fetch(`${process.env.EXPO_PUBLIC_STRIPE_API_URL}/payment_intent`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_STRIPE_API_KEY,
    },
    body: JSON.stringify({ id })
  });
  const json = await res.json();
  if (!res.ok) throw new Error('Something went wrong with the refund, the amount will automatically be refunded in 7 days.');
  return json;
}

export function usePaymentIntentCapture() {
  return useMutation({
    mutationFn: (id: string) => paymentIntentCapture(id),
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        e.message,
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
export function usePaymentIntentCancel() {
  return useMutation({
    mutationFn: (id: string) => paymentIntentCancel(id),
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        e.message,
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
