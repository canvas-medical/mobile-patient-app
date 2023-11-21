import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LabeledToggle, AppointmentList, MedicationList } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: g.size(64),
  },
  name: {
    ...g.titleSmall,
    color: g.white,
    fontSize: g.size(20),
    fontWeight: 'bold',
  },
  nameAndAvatarContainer: {
    alignItems: 'center',
    gap: g.size(8),
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
      <View style={s.nameAndAvatarContainer}>
        <FontAwesome name="user-circle-o" size={g.size(96)} color={g.white} />
        <Text style={s.name}>
          John Doe
        </Text>
      </View>
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
