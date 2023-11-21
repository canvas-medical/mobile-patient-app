import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LabeledToggle, AppointmentList, MedicationList } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleContainer: {
    marginTop: g.size(24),
    marginHorizontal: g.size(16),
  }
});

export default function AppointmentsAndMedications() {
  const [toggled, setToggled] = useState(false);
  return (
    <View style={s.container}>
      <View style={s.toggleContainer}>
        <LabeledToggle
          toggled={toggled}
          setToggled={setToggled}
          optionOne="Appointments"
          optionTwo="Prescriptions"
        />
      </View>
      {toggled ? <MedicationList /> : <AppointmentList />}
    </View>
  );
}
