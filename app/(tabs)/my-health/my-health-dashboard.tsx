/* eslint-disable react-native/no-inline-styles */ // TODO: Remove
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@components';
import { Link } from 'expo-router';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function MyHealth() {
  return (
    <Screen>
      <View style={s.container}>
        <Text>My Health</Text>
        <Link
          href="my-health/lab-results"
          style={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: g.white,
            borderStyle: 'solid',
            paddingHorizontal: g.size(16),
            paddingVertical: g.size(8),
            borderRadius: g.size(8),
          }}
        >
          <Text>Lab Results</Text>
        </Link>
      </View>
    </Screen>
  );
}
