import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-modal"
        options={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="questionnaire-response-details"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
