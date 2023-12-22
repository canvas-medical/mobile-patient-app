import { Stack } from 'expo-router';

export default function MyHealthStack() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="lab-results" options={{ headerShown: false }} />
      <Stack.Screen name="medications" options={{ headerShown: false }} />
      <Stack.Screen name="conditions" options={{ headerShown: false }} />
      <Stack.Screen name="immunizations" options={{ headerShown: false }} />
      <Stack.Screen name="allergies" options={{ headerShown: false }} />
      <Stack.Screen name="goals" options={{ headerShown: false }} />
      <Stack.Screen name="education" options={{ headerShown: false }} />
      <Stack.Screen name="procedures" options={{ headerShown: false }} />
    </Stack>
  );
}
