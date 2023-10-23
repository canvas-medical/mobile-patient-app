import { ActivityIndicator, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts, Alata_400Regular as Alata } from '@expo-google-fonts/alata';
import Poetsen from '@assets/fonts/PoetsenOne-Regular.ttf';
import { g } from '@styles';

const s = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Alata,
    Poetsen,
  });
  if (!fontsLoaded) return <ActivityIndicator style={s.loading} size="large" color={g.white} />;
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
    </Stack>
  );
}
