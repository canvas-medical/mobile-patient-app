import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useRootNavigationState, router } from 'expo-router';
import { usePatient } from '@services';
import { Screen } from '@components';
import Bugsnag from '@bugsnag/expo';

Bugsnag.start();
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

function ErrorView() {
  // TODO: test this error view.
  return (
    <View>
      <Text>Error</Text>
    </View>
  );
}

export default function Index() {
  const navigationState = useRootNavigationState();
  const { isFetching, data: patient } = usePatient();
  useEffect(() => {
    if (!navigationState?.key || isFetching) return;
    if (patient?.id) {
      router.replace('(tabs)/my-health');
    } else router.replace('initial');
  }, [navigationState, patient, isFetching]);

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Screen />
    </ErrorBoundary>
  );
}
