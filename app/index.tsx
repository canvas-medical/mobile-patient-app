import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRootNavigationState, router } from 'expo-router';
import { Image } from 'expo-image';
import Bugsnag from '@bugsnag/expo';
import { usePatient } from '@services';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.tertiaryBlue,
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.8,
    aspectRatio: 59 / 77,
  },
});

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
      <View style={s.container}>
        <Image
          source={graphic}
          style={s.graphic}
        />
      </View>
    </ErrorBoundary>
  );
}
