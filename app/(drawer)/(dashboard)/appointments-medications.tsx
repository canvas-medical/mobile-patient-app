import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LabeledToggle, AppointmentList, MedicationList } from '@components';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function AppointmentsAndMedications() {
  const [toggled, setToggled] = useState(false);
  return (
    <View style={s.container}>
      <LabeledToggle
        toggled={toggled}
        setToggled={setToggled}
        optionOne="Appointments"
        optionTwo="Prescriptions"
      />
      {toggled ? <MedicationList /> : <AppointmentList />}
    </View>
  );
}
