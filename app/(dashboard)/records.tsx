/* eslint-disable react-native/no-inline-styles */ // REMOVE ME
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useDocumentReferences, useObservation, useRecords } from '@services';
import { Screen } from '@components';
import { g } from '@styles';

export default function Dashboard() {
  const router = useRouter();
  const { data: consents } = useRecords('Consent');
  const { data: conditions } = useRecords('Condition');
  const { data: medications } = useRecords('MedicationStatement');
  const { data: appointments } = useRecords('Appointment');
  const { data: immunizations } = useRecords('Immunization');
  const { data: allergyIntolerance } = useRecords('AllergyIntolerance');
  const { data: diagnosticReport } = useRecords('DiagnosticReport');
  const { data: goals } = useRecords('Goal');
  const { data: documentReferences } = useDocumentReferences();
  const { data: observation } = useObservation();

  console.log('Consents: ', consents);
  console.log('Conditions: ', conditions);
  console.log('Medications: ', medications);
  console.log('Appointments: ', appointments);
  console.log('Immunizations: ', immunizations);
  console.log('Allergy Intolerance: ', allergyIntolerance);
  console.log('Diagnostic Report: ', diagnosticReport);
  console.log('Goals: ', goals);
  console.log('Document References: ', documentReferences);
  console.log('Observation: ', observation);

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Are you sure?',
              'This will delete all of your data and log you out.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Log Out',
                  style: 'destructive',
                  onPress: () => {
                    SecureStore.deleteItemAsync('patient_id');
                    router.replace('initial');
                  },
                },
              ],
            );
          }}
          style={{
            padding: g.size(8),
            borderRadius: g.size(4),
            backgroundColor: g.white,
          }}
        >
          <Text>&quot;Logout&quot;</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
