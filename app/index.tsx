import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRootNavigationState, router } from 'expo-router';
import { Image } from 'expo-image';
import Bugsnag from '@bugsnag/expo';
import { usePatient } from '@services';
import { ZeroState } from '@components';
import graphic from '@assets/images/graphic.png';
import warning from '@assets/images/warning.svg';
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
  return (
    <View style={s.container}>
      <Image
        source={graphic}
        style={s.graphic}
      />
      <ZeroState
        image={warning}
        text="Something went wrong. Please try again later."
        textColor={g.white}
        imageAspectRatio={1.25}
        marginBottom={0}
      />
    </View>
  );
}

export default function Index() {
  const navigationState = useRootNavigationState();
  const { isFetching, data: patient } = usePatient();
  useEffect(() => {
    if (!navigationState?.key || isFetching) return;
    if (patient?.id) {
      router.replace('(tabs)/messages');
      // router.replace('(tabs)/my-health');
    } else router.replace('initial');
    // router.replace('consents');
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
