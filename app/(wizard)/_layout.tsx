import { Stack } from 'expo-router';

export default function AuthStack() {
  return (
    <Stack>
      <Stack.Screen name="initial" options={{ headerShown: false }} />
      <Stack.Screen name="personal-details-one" options={{ headerShown: false }} />
    </Stack>
  );
}
