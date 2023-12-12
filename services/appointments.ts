import { useMutation, useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { getToken } from './access-token';
import { Alert } from 'react-native';

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

// TODO: Reorganize everything below

async function getSchedule() {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Schedule`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

export function useSchedule() {
  const scheduleQuery = useQuery({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(),
  });
  return scheduleQuery;
}

// =================================================================================================

async function getSlot(date: string, id: string) {
  console.log('GET ID: ', id);
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  console.log('PATIENT: ', patientID);
  console.log('FETCH URL: ', `${process.env.EXPO_PUBLIC_API_URL}/Slot?schedule=${id}&start=${date}&end=${date}`);
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Slot?schedule=${id}&start=${date}&end=${date}`, {
    // eslint-disable-next-line max-len
    // const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Slot?schedule=Location.2-Staff.3640cd20de8a470aa570a852859ac87e&start=2023-09-21&end=2023-09-23&duration=20'`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  console.log('JSON: ', json);
  return json.entry?.map((entry) => entry.resource) || [];
}

export function useSlot(date: string, id: string) {
  const slotQuery = useQuery({
    queryKey: ['slot', date, id],
    queryFn: () => getSlot(date, id),
  });
  return slotQuery;
}

// =================================================================================================

// TODO: Not sure we need these
// async function getCareTeams() {
//   const token = await getToken();
//   const patientID = await SecureStore.getItemAsync('patient_id');
//   const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/CareTeam?patient=Patient/${patientID}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       accept: 'application/json'
//     }
//   });
//   const json = await res.json();
//   return json.entry?.map((entry) => entry.resource) || [];
// }

// TODO: Not sure we need these
// export function useCareTeams() {
//   const careTeamsQuery = useQuery({
//     queryKey: ['careTeams'],
//     queryFn: () => getCareTeams(),
//   });
//   return careTeamsQuery;
// }

// =================================================================================================

async function appointmentCreate(data: any) { // TODO: Update type
  console.log('CREATE DATA: ', data);
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
          reference: `Location/${data.locationID}`
        },
        // {
        //   reference: '#appointment-meeting-endpoint',
        //   type: 'Endpoint'
        // }
      ],
      start: data.startTime,
      end: data.endTime,
      participant: [
        // Note: I reversed the order of these. I'm not sure if it matters but the api example had them
        // in the order [ patient, practitioner ] but the docs say "This list object requires one entry for
        // a practitioner. An optional 2nd entry may be supplied for the patient.". Also, "The first entry
        // has the actor.reference specify Practitioner/<practitioner_id> for the provider." and "The second
        // entry has the actor.reference specify Patient/<patient_id> for the patient"
        {
          actor: { reference: data.practitionerID },
          status: 'accepted' // Per FHIR, status is required, but it is not used by Canvas. Canvas recommends sending “active”
          // Update: i had to change this to "accepted" due to an error but the docs clearly state "active"
          // It's set to "accepted" in the example though 🤔
        },
        {
          actor: { reference: `Patient/${patientID}` },
          status: 'accepted' // Per FHIR, status is required, but it is not used by Canvas. Canvas recommends sending “active”
          // Update: i had to change this to "accepted" due to an error but the docs clearly state "active".
          // It's set to "accepted" in the example though 🤔
        },
      ]
    })
  });
  console.log('CREATE APPT RES: ', res);
  const json = await res.json();
  console.log('CREATE APPT JSON: ', json);
}

export function useCreateAppointment() {
  return useMutation({
    mutationFn: (data: any) => appointmentCreate(data), // TODO: type data
    onSuccess: () => null, // TODO: update
    onError: (e) => console.log('CREATE APPT ERROR: ', e), // TODO: update
    // onError: () => {
    //   Alert.alert(
    //     'Error',
    //     'There was an error creating your account. Please try again.',
    //     [
    //       { text: 'OK' }
    //     ],
    //     { cancelable: false }
    //   );
    // },
  });
}