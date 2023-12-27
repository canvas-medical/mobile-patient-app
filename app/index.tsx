import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useRootNavigationState, router } from 'expo-router';
import { usePatient } from '@services';
import { Screen } from '@components';
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'expo-datadog';

const config = new DdSdkReactNativeConfiguration(
  process.env.EXPO_PUBLIC_DD_CLIENT_TOKEN,
  process.env.EXPO_ENV || 'development',
  process.env.EXPO_PUBLIC_DD_APPLICATION_ID,
  true, // track user interactions such as tapping on a button.
  true, // track XHR resources.
  true // track errors.
);
config.nativeCrashReportEnabled = true;

export default function Index() {
  const navigationState = useRootNavigationState();
  const { isFetching, data: patient } = usePatient();
  useEffect(() => {
    const initializeDataDog = async () => {
      await DdSdkReactNative.initialize(config);
    };
    initializeDataDog();
  }, []);

  useEffect(() => {
    if (!navigationState?.key || isFetching) return;
    if (patient?.id) {
      router.replace('(tabs)/my-health');
    } else router.replace('initial');
  }, [navigationState, patient, isFetching]);

  return <Screen />;
}
