import { Stack } from 'expo-router';

export default function MyHealthStack() {
  return (
    <Stack initialRouteName="dashboard">
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="lab-results" options={{ headerShown: false }} />
    </Stack>
  );
}
