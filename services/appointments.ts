import { Alert } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AppointmentCreationData } from '@interfaces';
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
  return json.entry?.map((entry) => entry.resource) || [];
}

export function useAppointments() {
  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(),
  });
  return appointmentsQuery;
}

async function getSlot(date: string, id: string) {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Slot?schedule=${id}&start=${date}&end=${date}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

export function useSlot(date: string, id: string) {
  const slotQuery = useQuery({
    queryKey: ['slot', date, id],
    queryFn: () => getSlot(date, id),
  });
  return slotQuery;
}

async function appointmentCreate({
  startTime,
  endTime,
  practitionerID,
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
      // contained: [{
      //   resourceType: 'Endpoint',
      //   id: 'appointment-meeting-endpoint',
      // status: 'active',
      //   connectionType: {
      //     code: 'https'
      //   },
      //   payloadType: [{
      //     coding: [{
      //       code: 'video-call'
      //     }]
      //   }],
      //   address: 'https://url-for-video-chat.example.com?meeting=abc123'
      // }],
      status: 'proposed',
      // appointmentType: {
      //   coding: [{
      //     system: 'http://snomed.info/sct',
      //     code: '448337001',
      //     display: 'Telemedicine consultation with patient (procedure)'
      //   }]
      // },
      // reasonCode: [{
      //   coding: [{
      //     system: 'INTERNAL',
      //     code: 'INIV',
      //     display: 'Initial Visit',
      //     userSelected: false
      //   }],
      //   text: 'Initial 30 Minute Visit'
      // }],
      supportingInformation: [
        {
          reference: 'Location/1' // TODO: This seems that it should always be 1 but I want to check with Canvas
        },
        // {
        //   reference: '#appointment-meeting-endpoint',
        //   type: 'Endpoint'
        // }
      ],
      start: startTime,
      end: endTime,
      participant: [
        {
          actor: { reference: `Patient/${patientID}` },
          status: 'accepted' // Per FHIR, status is required, but it is not used by Canvas. Canvas recommends sending “active”
          // Update: i had to change this to "accepted" due to an error but the docs clearly state "active".
          // It's set to "accepted" in the example though 🤔
        },
        {
          actor: { reference: practitionerID },
          status: 'accepted' // Per FHIR, status is required, but it is not used by Canvas. Canvas recommends sending “active”
          // Update: i had to change this to "accepted" due to an error but the docs clearly state "active"
          // It's set to "accepted" in the example though 🤔
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
            onPress: () => router.push('appointments-medications'),
          }
        ],
        { cancelable: false }
      );
    },
    onError: () => {
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
