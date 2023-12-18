import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts, Alata_400Regular as Alata } from '@expo-google-fonts/alata';
import { registerForPushNotificationsAsync } from '@services';
import Poetsen from '@assets/fonts/PoetsenOne-Regular.ttf';
import { g } from '@styles';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const s = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Alata,
    Poetsen,
  });
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded) return <ActivityIndicator style={s.loading} size="large" color={g.white} />;
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="initial" options={{ headerShown: false }} />
        <Stack.Screen name="personal-details" options={{ headerShown: false }} />
        <Stack.Screen name="consents" options={{ headerShown: false }} />
        <Stack.Screen name="questionnaire" options={{ headerShown: false }} />
        <Stack.Screen name="coverage" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pdf-modal" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
