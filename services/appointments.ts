import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AppointmentCreationData } from '@interfaces';
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
  const allAppointments = json.entry?.map((entry) => entry.resource)?.sort((a: any, b: any) => (new Date(b.start).getTime() - new Date(a.start).getTime())) || [];
  return allAppointments.filter((appt) => appt.status !== 'cancelled');
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
  appointmentType,
  appointmentTypeCode,
}: AppointmentCreationData) {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const supportingInformation = () => {
    switch (appointmentType) {
      case 'Office Visit':
        return [{
          reference: 'Location/1'
        }];
      case 'Video Call':
        return [{
          reference: 'Location/1'
        }, {
          reference: '#appointment-meeting-endpoint',
          type: 'Endpoint'
        }];
      case 'Phone Call':
      case 'Home Visit':
      default:
        return null;
    }
  };
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
      supportingInformation: supportingInformation(),
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
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
    },
  });
}
