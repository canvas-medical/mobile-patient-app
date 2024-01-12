import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { ApiError } from '@interfaces';
import Bugsnag from '@bugsnag/expo';
import { getToken } from './access-token';

export const ConsentCodes = {
  'Consent Document': { code: '59284-0', display: 'Consent Document', system: 'LOINC' },
};

export const ConsentPDFs = {
  'Consent Document': 'https://www.mainemed.com/sites/default/files/content/Consent%20to%20Treat%20%26%20Acknowledgement.pdf',
};

/**
 * Creates a consent record for a patient.
 *
 * @param data - The consent data, including the consent type.
 * @returns {Promise<void>} - A promise that resolves when the consent record is created successfully.
 * @throws - An error if there is an issue creating the consent record.
 */
async function consentCreate(data: { consent: string }) {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const pdfResponse = await fetch(ConsentPDFs[data.consent]);
  const blob = await pdfResponse.blob();
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  const base64 = await new Promise((res) => {
    reader.onloadend = () => {
      res(reader.result);
    };
  });
  const date = new Date();
  const currentDay = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Consent`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      resourceType: 'Consent',
      status: 'active',
      scope: {
        coding: [{}]
      },
      category: [
        {
          coding: [
            ConsentCodes[data.consent]
          ]
        }
      ],
      patient: {
        reference: `Patient/${patientId}`
      },
      sourceAttachment: {
        contentType: 'application/pdf',
        data: base64,
        title: data.consent,
      },
      provision: {
        period: {
          start: currentDay
        }
      }
    })
  });
  const Json: null | ApiError = await res.json();
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
}

/**
 * Custom hook for creating a consent record that handles fetch states and error handling automatically.
 *
 * @returns A mutation function that creates a consent.
 */
export function useConsentCreate() {
  return useMutation({
    mutationFn: (data: { consent: string }) => consentCreate(data),
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        'There was an error creating your consent. Please try again.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
