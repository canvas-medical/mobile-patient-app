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

async function getSlot() {
  const token = await getToken();
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Slot?schedule=Location.2-Staff.3640cd20de8a470aa570a852859ac87e&start=2023-09-21&end=2023-09-23&duration=20'`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });
  const json = await res.json();
  return json.entry?.map((entry) => entry.resource) || [];
}

export function useSlot() {
  const slotQuery = useQuery({
    queryKey: ['slot'],
    queryFn: () => getSlot(),
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
