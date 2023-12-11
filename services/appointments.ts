import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
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

async function getCareTeams() {
  const token = await getToken();
  const patientID = await SecureStore.getItemAsync('patient_id');
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/CareTeam?patient=Patient/${patientID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

export function useCareTeams() {
  const careTeamsQuery = useQuery({
    queryKey: ['careTeams'],
    queryFn: () => getCareTeams(),
  });
  return careTeamsQuery;
}

// =================================================================================================
