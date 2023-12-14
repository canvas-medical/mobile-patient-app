import { Stack } from 'expo-router';

export default function MyHealthStack() {
  return (
    <Stack initialRouteName="my-health">
      <Stack.Screen name="my-health" options={{ headerShown: false }} />
      <Stack.Screen name="lab-results" options={{ headerShown: false }} />
    </Stack>
  );
}
