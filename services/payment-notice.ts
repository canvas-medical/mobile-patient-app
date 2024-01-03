import { useMutation, useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { ApiError } from '@interfaces';
import Bugsnag from '@bugsnag/expo';
import { getToken } from './access-token';

/**
 * Retrieves payment notices for a specific patient.
 *
 * @returns {Promise<Array<Object>>} An array of payment notices.
 */
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

/**
 * Custom hook for fetching payment notices.
 *
 * @returns {QueryResult} The result of the query.
 */
export function usePaymentNotices() {
  return useQuery({
    queryKey: ['paymentNotices'],
    queryFn: () => getPaymentNotices(),
  });
}

/**
 * Submits a payment notice with the specified amount.
 * @param amount - The amount of the payment notice in dollars, formatted as a float.
 * @throws {Error} - If there is an issue with the API response.
 */
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
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
}

/**
 * Custom hook for submitting a payment notice.
 *
 * @returns A mutation function that submits a payment notice.
 */
export function usePaymentNoticeSubmit() {
  return useMutation({
    mutationFn: (amount: string) => paymentNoticeSubmit(amount),
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
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
