import { Alert } from 'react-native';
import { ApiError, PatientProfileFormData } from '@interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Bugsnag from '@bugsnag/expo';
import { coverageCreate, coverageUpdate } from './coverage';
import { getToken } from './access-token';

/**
 * Converts the birth sex value to a corresponding code.
 *
 * @param {string} birthSex - The birth sex value.
 * @returns {string} The corresponding birth sex code.
 */
function birthSexCodeSwitch(birthSex: string): string {
  switch (birthSex) {
    case 'Female':
    case 'Male':
      return birthSex[0];
    case 'Other':
      return 'OTH';
    case 'Unknown':
      return 'UNK';
    default:
      return 'UNK';
  }
}

/**
 * Creates a new patient record.
 *
 * @param {object} data - The data for the patient record.
 * @returns {Promise<void>} - A promise that resolves when the patient record is created successfully.
 * @throws {Error} - If there is an error creating the patient record.
 */
async function patientCreate(data: PatientProfileFormData): Promise<void> {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Patient`, {
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
          valueCode: birthSexCodeSwitch(data?.birthSex),
        },
      ],
      name: [
        {
          use: 'official',
          family: data?.lastName,
          given: [data?.firstName, ...(data?.middleName ? [data?.middleName] : [])]
        },
        ...(data?.preferredName ? [{
          use: 'nickname',
          given: [data?.preferredName]
        }] : [])
      ],
      telecom: [
        {
          system: 'phone',
          value: data?.phone,
        },
        {
          system: 'email',
          value: data?.email,
        }
      ],
      gender: data?.gender.toLowerCase(),
      birthDate: data?.birthDate,
      address: [{
        line: [data?.addressLine1, ...(data?.addressLine2 ? [data?.addressLine2] : [])],
        city: data?.city,
        state: data?.stateAbbreviation,
        postalCode: data?.postalCode
      }],
    })
  });
  if (!res.ok) throw new Error();
  const urlParts = res.headers.get('Location').split('/');
  await SecureStore.setItemAsync('patient_id', urlParts[urlParts.length - 3]);
}

/**
 * Custom hook for creating a patient record that handles fetch states and error handling automatically.
 *
 * @returns A mutation function that can be used to create a patient.
 */
export function useCreatePatient() {
  return useMutation({
    mutationFn: (data: PatientProfileFormData) => patientCreate(data), // TODO: Add types
    onSuccess: () => router.push('coverage'),
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

/**
 * Retrieves the patient information from the server.
 *
 * @returns {Promise<any>} A promise that resolves to the patient information.
 * @throws {Error} If no patient id is found.
 */
async function getPatient() {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  if (!patientId) throw (new Error('No patient id found'));

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Patient/${patientId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json;
}

/**
 * Custom hook for fetching patient data that handles fetch states, errors, and caching automatically.
 *
 * @returns {QueryResult} The result of the query for patient data?.
 */
export function usePatient() {
  return useQuery({
    queryKey: ['patient_data'],
    queryFn: () => getPatient(),
  });
}

/**
 * Updates a patient record.
 *
 * @param {object} data - The data for the patient record.
 * @returns {Promise<void>} - A promise that resolves when the patient record is updated successfully.
 * @throws {Error} - If there is an error updating the patient record.
 */
async function updatePatient(data: PatientProfileFormData): Promise<void> {
  const token = await getToken();
  const patientId = await SecureStore.getItemAsync('patient_id');
  const body = {
    resourceType: 'Patient',
    extension: [
      {
        url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex',
        valueCode: birthSexCodeSwitch(data?.birthSex),
      },
    ],
    name: [
      {
        use: 'official',
        family: data?.lastName,
        given: [data?.firstName, ...(data?.middleName ? [data?.middleName] : [])]
      },
      ...(data?.preferredName ? [{
        use: 'nickname',
        given: [data?.preferredName]
      }] : [])
    ],
    telecom: [
      {
        system: 'phone',
        value: data?.phone,
      },
      {
        system: 'email',
        value: data?.email,
      }
    ],
    gender: data?.gender.toLowerCase(),
    birthDate: data?.birthDate,
    address: [{
      line: [data?.addressLine1, ...(data?.addressLine2 ? [data?.addressLine2] : [])],
      city: data?.city,
      state: data?.stateAbbreviation,
      postalCode: data?.postalCode
    }],
    ...(data?.avatar) && { photo: [{ data: data?.avatar }] },
  };
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Patient/${patientId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error();
  const Json: null | ApiError = await res.json();
  if (Json?.issue?.length > 0) throw new Error(Json.issue[0].details.text);
}

/**
 * Custom hook for updating a patient record that handles fetch states and error handling automatically.
 *
 * @returns A mutation function that can be used to update a patient.
 */
export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PatientProfileFormData) => {
      const { coverageID, insurer, memberID, groupNumber, ...patientData } = data;
      if (coverageID) {
        // Update coverage if it exists
        await coverageUpdate({ coverageID, insurer, memberID, groupNumber });
      } else if (insurer && memberID) {
        // Create new coverage if we do not have a coverageID
        await coverageCreate({ insurer, memberID, groupNumber });
      }
      return updatePatient(patientData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient_data', 'patient_coverage'] });
      Alert.alert(
        'Your profile has been updated',
        '',
        [{
          text: 'OK',
          onPress: () => { if (router.canGoBack()) router.back(); },
        }],
        { cancelable: false }
      );
    },
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        'There was an error updating your profile. Please try again.',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
