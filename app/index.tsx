import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useRootNavigationState, router } from 'expo-router';
import { usePatient } from '@services';
import { Screen } from '@components';

export default function Index() {
  const navigationState = useRootNavigationState();
  const { isFetching, data: patient } = usePatient();

  useEffect(() => {
    if (!navigationState?.key || isFetching) return;
    if (patient?.id) {
      router.replace('(tabs)/my-health');
    } else router.replace('initial');
  }, [navigationState, patient, isFetching]);

  return <Screen />;
}
