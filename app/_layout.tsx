import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, LogBox } from 'react-native';
import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_100Thin as InterThin,
  Inter_200ExtraLight as InterExtraLight,
  Inter_300Light as InterLight,
  Inter_400Regular as InterRegular,
  Inter_500Medium as InterMedium,
  Inter_600SemiBold as InterSemiBold,
  Inter_700Bold as InterBold,
  Inter_800ExtraBold as InterExtraBold,
  Inter_900Black as InterBlack,
} from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StateMachineProvider } from 'little-state-machine';
import { registerForPushNotificationsAsync } from '@services';
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
    InterThin,
    InterExtraLight,
    InterLight,
    InterRegular,
    InterMedium,
    InterSemiBold,
    InterBold,
    InterExtraBold,
    InterBlack,
  });
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const IGNORED_LOGS = [
    'Unhandled Promise Rejection',
    'You seem to update props of the "TRenderEngineProvider" component in short periods of time, causing costly tree rerenders',
    'Bugsnag.start() was called more than once. Ignoring.',
  ];

  LogBox.ignoreLogs(IGNORED_LOGS);

  // Workaround for Expo 45
  if (__DEV__) {
    const withoutIgnored = (logger) => (...args) => {
      const output = args.join(' ');

      if (!IGNORED_LOGS.some((log) => output.includes(log))) {
        logger(...args);
      }
    };

    console.log = withoutIgnored(console.log);
    console.info = withoutIgnored(console.info);
    console.warn = withoutIgnored(console.warn);
    console.error = withoutIgnored(console.error);
  }

  if (!fontsLoaded) return <ActivityIndicator style={s.loading} size="large" color={g.primaryBlue} />;
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <StateMachineProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="initial" options={{ headerShown: false }} />
          <Stack.Screen name="personal-details" options={{ headerShown: false }} />
          <Stack.Screen name="contact-information" options={{ headerShown: false }} />
          <Stack.Screen name="consents" options={{ headerShown: false }} />
          <Stack.Screen name="questionnaire" options={{ headerShown: false }} />
          <Stack.Screen name="coverage" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="pdf-modal" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
      </StateMachineProvider>
    </QueryClientProvider>
  );
}
