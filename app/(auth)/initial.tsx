import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    marginTop: g.size(96),
    gap: g.size(16),
  },
  container: {
    justifyContent: 'flex-end',
    paddingHorizontal: g.size(36),
    paddingBottom: g.size(155),
  },
  subtitle: {
    ...g.bodyXLarge,
    color: g.white,
  },
  subtitleEmphasized: {
    ...g.titleSmall,
  },
  title: {
    ...g.titleLarge,
    marginBottom: g.size(20),
  },
});

export default function Initial() {
  return (
    <Screen style={s.container}>
      <Text style={s.title}>Welcome</Text>
      <Text style={s.subtitle}>Manage your medical records</Text>
      <Text style={s.subtitleEmphasized}>seamlessly and intuitively</Text>
      <View style={s.buttonContainer}>
        <Button
          label="Sign In"
          theme="secondary"
          onPress={() => router.push('sign-in')}
        />
        <Button
          label="Create an account"
          theme="tertiary"
          onPress={() => router.push('sign-up')}
        />
      </View>
    </Screen>
  );
}
