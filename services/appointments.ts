import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppointmentCreationData, AppointmentCancellationData } from '@interfaces';
import Bugsnag from '@bugsnag/expo';
import { getToken } from './access-token';

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

export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
  });
}

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

export function useSlot(date: string, id: string, duration: number) {
  return useQuery({
    queryKey: ['slot', date, id],
    queryFn: () => getSlot(date, id, duration),
  });
}

async function appointmentCreate({
  startTime,
  endTime,
  practitionerID,
  reason,
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
      status: 'proposed',
      reasonCode: [{
        text: reason
      }],
      supportingInformation: [
        {
          reference: 'Location/1'
        },
      ],
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

async function appointmentCancel({
  id,
  start,
  end,
  practitionerID,
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
      supportingInformation: [
        {
          reference: 'Location/1'
        },
      ],
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
