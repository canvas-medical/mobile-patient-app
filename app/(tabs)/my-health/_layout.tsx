import { Stack } from 'expo-router';

export default function MyHealthStack() {
  return (
    <Stack initialRouteName="my-health-dashboard">
      <Stack.Screen name="my-health-dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="lab-results" options={{ headerShown: false }} />
    </Stack>
  );
}
