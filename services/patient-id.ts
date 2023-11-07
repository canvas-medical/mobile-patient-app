import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export function usePatientId() {
  const [patientId, setPatientId] = useState<string>(null);
  useEffect(() => {
    async function getPatientId() {
      const token = await SecureStore.getItemAsync('patient_id');
      setPatientId(token);
    }
    getPatientId();
  }, []);
  return patientId;
}
