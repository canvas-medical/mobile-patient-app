import { Stack } from 'expo-router';

export default function OnboardingStack() {
  return (
    <Stack>
      <Stack.Screen name="initial" options={{ headerShown: false }} />
      <Stack.Screen name="personal-details" options={{ headerShown: false }} />
      <Stack.Screen name="consents" options={{ headerShown: false }} />
      <Stack.Screen name="questionnaire" options={{ headerShown: false }} />
      <Stack.Screen name="coverage" options={{ headerShown: false }} />
    </Stack>
  );
}
