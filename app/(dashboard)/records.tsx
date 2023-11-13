/* eslint-disable react-native/no-inline-styles */ // REMOVE ME
/* eslint-disable lines-around-directive */ // REMOVE ME
/* eslint-disable max-len */ // REMOVE ME
import { TouchableOpacity, View } from 'react-native';
import { Screen, Search } from '@components';
import { useDocumentReferences, useObservation, useRecords } from '@services';

// Consent ✔️
// Appointment ✔️
// Condition ✔️
// MedicationStatement ✔️
// Immunization ✔️
// AllergyIntolerance ✔️
// DiagnosticReport ✔️
// Goals ✔️
// DocumentReference ✔️
// Observation ✔️

export default function Dashboard() {
  // 'https://fumage-example.canvasmedical.com/Consent?patient=Patient%2F2c4b29a411b043bfb1c34c8c3683c7ca';
  // 'https://fumage-example.canvasmedical.com/Condition?patient=Patient%2Fb8dfa97bdcdf4754bcd8197ca78ef0f0';
  // 'https://fumage-example.canvasmedical.com/MedicationStatement?patient=Patient%2Fb8dfa97bdcdf4754bcd8197ca78ef0f0';
  'https://fumage-example.canvasmedical.com/Appointment?patient=Patient%2Fa031d1ba40d74aebb8ed716716da05c2&practitioner=Practitioner%2F4150cd20de8a470aa570a852859ac87e'; // useRecords
  // 'https://fumage-example.canvasmedical.com/Immunization?patient=Patient/4d9c4a797b8c4a58872017e7a19a474e';
  // 'https://fumage-example.canvasmedical.com/AllergyIntolerance?patient=Patient%2Fb8dfa97bdcdf4754bcd8197ca78ef0f0';
  'https://fumage-example.canvasmedical.com/DiagnosticReport?patient=Patient%2Fca52f2b76011429d8a0e4aa2b56b18bc&code=73562&date=ge2023-09-12'; // useRecords
  // 'https://fumage-example.canvasmedical.com/Goal?patient=Patient/f3d750f5d77d403c96baef6a6055c6e7';
  'https://fumage-example.canvasmedical.com/DocumentReference?subject=Patient%2Fcfd91cd3bd9046db81199aa8ee4afd7f&status=current&type=http%3A%2F%2Floinc.org%7C11502-2'; // useDocumentReferences
  // 'https://fumage-example.canvasmedical.com/Observation?category=vital-signs&patient=Patient%2Fa1197fa9e65b4a5195af15e0234f61c2';

  const { data: consents } = useRecords('Consent');
  const { data: conditions } = useRecords('Condition');
  const { data: medications } = useRecords('MedicationStatement');
  const { data: appointments } = useRecords('Appointment'); // may need further parameters - see uncommented paths above
  const { data: immunizations } = useRecords('Immunization');
  const { data: allergyIntolerance } = useRecords('AllergyIntolerance');
  const { data: diagnosticReport } = useRecords('DiagnosticReport'); // may need further parameters - see uncommented paths above
  const { data: goals } = useRecords('Goal');
  const { data: documentReferences } = useDocumentReferences(); // may need further parameters - see uncommented paths above
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
      <View />
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <Search />
      </View>
    </Screen>
  );
}
