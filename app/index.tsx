import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useAccessToken, usePatientId } from '@services';
import { Screen } from '@components';
import { Image } from 'expo-image';
import logo from '@assets/logos/bd-logo-white.png';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: g.width * 0.75,
    height: g.width * 0.375,
  },
});

export default function Index() {
  const navigationState = useRootNavigationState();
  const router = useRouter();
  const patientID = usePatientId();
  const accessToken = useAccessToken();

  useEffect(() => {
    if (!navigationState?.key || !accessToken) return;
    if (patientID) {
      router.replace('records');
    } else router.replace('initial');
  }, [navigationState, accessToken, patientID]);

  return (
    <Screen>
      <View style={s.container}>
        <Image
          source={logo}
          style={s.logo}
        />
      </View>
    </Screen>
  );
}
