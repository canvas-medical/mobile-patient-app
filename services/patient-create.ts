import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export async function patientCreate(data) {
  const token = await SecureStore.getItemAsync('client_token');
  const res = await fetch('https://fumage-brewerdigital-apiprize.canvasmedical.com/Patient', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      resourceType: 'Patient',
      extension: [
        {
          url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
          valueCode: data.birthSex[0],
        },
      ],
      name: [
        {
          use: 'official',
          family: data.lastName,
          given: [data.firstName, data.middleName]
        },
        {
          use: 'nickname',
          given: [data.preferredName]
        }
      ],
      telecom: [
        {
          system: 'phone',
          value: data.phone,
        },
        {
          system: 'email',
          value: data.email,
        }
      ],
      gender: data.gender.toLowerCase(),
      birthDate: '1990-06-21',
    })
  });
  const urlParts = res.headers.get('Location').split('/');
  await SecureStore.setItemAsync('patient_id', urlParts[urlParts.length - 3]);
}

export function useCreatePatient(data) {
  return useMutation({
    mutationFn: () => patientCreate(data),
    onSuccess: () => router.push('records'),
    onError: () => {
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
