import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile-modal"
        options={{
          presentation: 'modal',
          headerShown: false,
          gestureEnabled: false, // maybe remove
        }}
      />
    </Stack>
  );
}
