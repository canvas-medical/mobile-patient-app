import { StyleSheet, Text } from 'react-native';
import { Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  title: {
    ...g.titleLarge,
  },
});

export default function Appointments() {
  return (
    <Screen>
      <Text style={s.title}>
        Profile
      </Text>
      <Text style={s.title}>
        Appointments
      </Text>
    </Screen>
  );
}
