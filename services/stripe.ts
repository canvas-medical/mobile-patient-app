import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import Bugsnag from '@bugsnag/expo';

/**
 * Retrieves a payment intent from the Stripe API.
 *
 * @param cents - The amount in cents for the payment intent.
 * @returns {Promise<Object>} A Promise that resolves to the payment intent.
 * @throws An error if something goes wrong with the payment.
 */
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

/**
 * Captures a payment intent using the provided ID.
 *
 * @param id - The ID of the payment intent to capture.
 * @returns {Promise<Object>} A Promise that resolves to the captured payment intent.
 * @throws An error if something goes wrong with the payment.
 */
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

/**
 * Cancels a payment intent.
 *
 * @param id - The ID of the payment intent to cancel.
 * @returns {Promise<Object>} A Promise that resolves to the canceled payment intent.
 * @throws An error if something goes wrong with the refund.
 */
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

/**
 * A custom hook that returns a mutation function for capturing a payment intent.
 *
 * @returns The mutation function for capturing a payment intent.
 */
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

/**
 * Custom hook for canceling a payment intent.
 *
 * @returns A mutation function that cancels the payment intent.
 */
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
