import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppointmentCreationData, AppointmentCancellationData } from '@interfaces';
import Bugsnag from '@bugsnag/expo';
import { getToken } from './access-token';

/**
 * Retrieves the appointments for a specific patient.
 *
 * @returns {Promise<Array<any>>} A promise that resolves to an array of appointment objects.
 */
async function getAppointments() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Appointment?patient=Patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource)?.sort((a: any, b: any) => (new Date(b.start).getTime() - new Date(a.start).getTime())) || [];
}

/**
 * Custom hook for fetching appointments data that handles fetch states, errors, and caching automatically.
 *
 * @returns {QueryResult} The result of the query for the appointments data.
 */
export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
  });
}

/**
 * Retrieves available slots for a given date and schedule ID.
 *
 * @param date - The date for which slots are to be retrieved.
 * @param id - The schedule ID.
 * @param duration - The duration of each slot.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of slot objects.
 */
async function getSlot(date: string, id: string, duration) {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Slot?schedule=${id}&start=${date}&end=${date}&duration=${duration}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

/**
 * Custom hook to fetch and manage slot data.
 *
 * @param date - The date of the slot.
 * @param id - The ID of the slot.
 * @param duration - The duration of the slot.
 * @returns {QueryResult} The result of the query for the slot data
 */
export function useSlot(date: string, id: string, duration: number) {
  return useQuery({
    queryKey: ['slot', date, id],
    queryFn: () => getSlot(date, id, duration),
  });
}

/**
 * Returns an array of supporting information based on the appointment type.
 *
 * @param appointmentType - The type of appointment.
 * @returns {Array<Object>} An array of supporting information objects.
 */
const supportingInformation = (appointmentType: string) => {
  switch (appointmentType) {
    case 'Video Call':
    case 'Phone Call':
    case 'Home Visit':
      return [{
        reference: 'Location/1'
      }, {
        reference: '#appointment-meeting-endpoint',
        type: 'Endpoint'
      }];
    case 'Office Visit':
    default:
      return [{
        reference: 'Location/1'
      }];
  }
};

/**
 * Creates a new appointment.
 *
 * @param startTime - The start time of the appointment.
 * @param endTime - The end time of the appointment.
 * @param practitionerID - The ID of the practitioner associated with the appointment.
 * @param reason - The reason for the appointment.
 * @param appointmentType - The type of the appointment.
 * @param appointmentTypeCode - The code representing the appointment type.
 * @returns {Promise<void>} A promise that resolves when the appointment is created.
 * @throws Error if the server response is not OK.
 */
async function appointmentCreate({
  startTime,
  endTime,
  practitionerID,
  reason,
  appointmentType,
  appointmentTypeCode,
}: AppointmentCreationData) {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Appointment`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      resourceType: 'Appointment',
      contained: appointmentType === 'Video Call' ? [{
        resourceType: 'Endpoint',
        id: 'appointment-meeting-endpoint',
        status: 'active',
        connectionType: {
          code: 'https'
        },
        payloadType: [{
          coding: [{
            code: 'video-call'
          }]
        }],
        address: 'https://url-for-video-chat.example.com?meeting=abc123'
      }] : null,
      status: 'proposed',
      appointmentType: {
        coding: [{
          system: 'http://snomed.info/sct',
          code: appointmentTypeCode,
          display: appointmentType
        }]
      },
      reasonCode: [{
        text: reason
      }],
      supportingInformation: supportingInformation(appointmentType),
      start: startTime,
      end: endTime,
      participant: [
        {
          actor: { reference: `Patient/${patientID}` },
          // According to FHIR, the 'status' field is mandatory. Although Canvas doesn't use it and suggests 'active', the valid value is 'accepted'.
          status: 'accepted'
        },
        {
          actor: { reference: practitionerID },
          // According to FHIR, the 'status' field is mandatory. Although Canvas doesn't use it and suggests 'active', the valid value is 'accepted'.
          status: 'accepted'
        },
      ]
    })
  });
  if (!res.ok) throw Error;
}

/**
 * Custom hook for creating an appointment that handles fetch states and error handling automatically.
 *
 * @returns A mutation function that creates an appointment.
 */
export function useCreateAppointment() {
  return useMutation({
    mutationFn: (data: AppointmentCreationData) => appointmentCreate(data),
    onSuccess: () => {
      Alert.alert(
        'Success',
        'Your appointment has been booked.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('appointments'),
          }
        ],
        { cancelable: false }
      );
    },
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        'There was an error booking your appointment. Please try again.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    },
  });
}

/**
 * Cancels an appointment.
 *
 * @param {AppointmentCancellationData} data - The appointment cancellation data.
 * @returns {Promise<void>} - A promise that resolves when the appointment is cancelled successfully.
 * @throws {Error} - If the cancellation request fails.
 */
async function appointmentCancel({
  id,
  start,
  end,
  practitionerID,
  appointmentType,
}: AppointmentCancellationData) {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Appointment/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      status: 'cancelled',
      start,
      end,
      supportingInformation: supportingInformation(appointmentType),
      participant: [
        {
          actor: { reference: `Patient/${patientID}` },
          // According to FHIR, the 'status' field is mandatory. Although Canvas doesn't use it and suggests 'active', the valid value is 'accepted'.
          status: 'accepted'
        },
        {
          actor: { reference: practitionerID },
          // According to FHIR, the 'status' field is mandatory. Although Canvas doesn't use it and suggests 'active', the valid value is 'accepted'.
          status: 'accepted'
        },
      ]
    })
  });

  if (!res.ok) throw Error;
}

/**
 * Custom hook for canceling an appointment that handles fetch states and error handling automatically.
 *
 * @returns A mutation function that cancels an appointment.
 */
export function useCancelAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AppointmentCancellationData) => appointmentCancel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      Alert.alert(
        'Your appointment has been cancelled',
        '',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    },
    onError: (e) => {
      Bugsnag.leaveBreadcrumb('Error', { error: e });
      Alert.alert(
        'Error',
        'There was an error canceling your appointment. Please try again.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    },
  });
}
