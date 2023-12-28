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
    // TODO: Strip out unused key values
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
          // From Canvas docs: You can use a Location reference within the SupportingInformation attribute to specify the Location of the appointment.
          // To get the location id, use the Schedule Search endpoint. This will give you a resource.id like Location.1-Staff.c2ff4546548e46ab8959jh3.
          // The Location ID is the value displayed after the period. If your instance only has one practice location, the ID will always be 1.
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
            onPress: () => router.replace('appointments'),
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
