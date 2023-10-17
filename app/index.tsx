import { useRouter, useRootNavigationState } from 'expo-router';
// import { useRouter, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const navigationState = useRootNavigationState();
  const router = useRouter();

  async function getToken() {
    // const token = await SecureStore.getItemAsync('token');
    // if (token) router.replace('/records');
    // else router.replace('/initial');
    // router.replace('/initial');
    router.replace('/records');
  }

  useEffect(() => {
    if (!navigationState?.key) return;
    getToken();
  }, [navigationState]);

  return null;
  // TODO: replace null with SplashScreen
  // Actually, SplashScreen is deprecated - look into alternatives
}
