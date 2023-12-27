import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@interfaces';
import * as SecureStore from 'expo-secure-store';
import Bugsnag from '@bugsnag/expo';
import { getToken } from './access-token';

export const Insurers = {
  'CO BCBS': {
    payerId: '00050',
    transactorType: 'Commercial',
    code: 'PPO'
  },
  'CO Kaiser Foundation Health Plan': {
    payerId: '91617',
    transactorType: 'Commercial',
    code: 'HMO'
  },
  'Colorado Access': {
    payerId: '84129',
    transactorType: 'Commercial',
    code: 'SUBSIDIZ'
  },
  'SC BCBS - BlueChoice Commercial': {
    payerId: 'SX085',
    transactorType: 'Commercial',
    code: 'PPO'
  },
  'CO Medicaid': {
    payerId: 'SKCO0',
    transactorType: 'Medicaid',
    code: 'SUBSIDIZ'
  },
};

async function coverageCreate(data: {insurer: string, memberId: string, groupNumber?: string}) {
  const token = await getToken();
  const provider = Insurers[data.insurer];
  const patientId = await SecureStore.getItemAsync('patient_id');
  const classes = data.groupNumber ? [
    {
      type: {
        coding: [
          {
            system: 'http://hl7.org/fhir/ValueSet/coverage-class',
            code: 'group'
          }
        ]
      },
      value: data.groupNumber
    },
  ] : null;
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Coverage`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      resourceType: 'Coverage',
      order: 1,
      status: 'active',
      type: {
        coding: [
          {
            system: 'http://hl7.org/fhir/ValueSet/coverage-type',
            code: provider.code,
          }
        ]
      },
      subscriber: {
        reference: `Patient/${patientId}`
      },
      subscriberId: data.memberId,
      beneficiary: {
        reference: `Patient/${patientId}`
      },
      relationship: {
        coding: [
          {
            system: 'http://hl7.org/fhir/ValueSet/subscriber-relationship',
            code: 'self',
          }
        ]
      },
      payor: [
        {
          identifier: { value: provider.payerId }
        }
      ],
      class: classes
    })
  });
  const Json: null | ApiError = await res.json();
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
}

export function useCreateCoverage() {
  return useMutation({
    mutationFn: (data: {insurer: string, memberId: string, groupNumber?: string}) => coverageCreate(data),
    onSuccess: () => router.push('consents'),
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        'There was an error creating your account. Please try again.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
