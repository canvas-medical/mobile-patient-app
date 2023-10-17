import { StyleSheet, Text } from 'react-native';
import { Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: g.size(16),
  },
  title: {
    ...g.titleLarge,
  },
});

export default function Appointments() {
  return (
    <Screen style={s.container}>
      <Text style={s.title}>
        Profile
      </Text>
      <Text style={s.title}>
        Appointments
      </Text>
    </Screen>
  );
}
