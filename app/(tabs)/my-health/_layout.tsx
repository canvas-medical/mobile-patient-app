import { Stack } from 'expo-router';

export default function MyHealthStack() {
  return (
    <Stack initialRouteName="my-health-dashboard">
      <Stack.Screen name="my-health-dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="lab-results" options={{ headerShown: false }} />
      {/* <Stack.Screen name="allergies" options={{ headerShown: false }} />
      <Stack.Screen name="appointments-medications" options={{ headerShown: false }} />
      <Stack.Screen name="book-appointment" options={{ headerShown: false }} />
      <Stack.Screen name="conditions" options={{ headerShown: false }} />
      <Stack.Screen name="goals" options={{ headerShown: false }} />
      <Stack.Screen name="immunizations" options={{ headerShown: false }} />
      <Stack.Screen name="invoices" options={{ headerShown: false }} />
      <Stack.Screen name="messaging" options={{ headerShown: false }} />
      <Stack.Screen name="metrics-reports" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
