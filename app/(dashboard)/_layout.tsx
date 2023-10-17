import { ActivityIndicator, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
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

export default function DashboardTabs() {
  const [fontsLoaded] = useFonts({
    Alata,
    Poetsen,
  });
  if (!fontsLoaded) return <ActivityIndicator style={s.loading} size="large" color={g.white} />;
  return (
    <Tabs>
      <Tabs.Screen name="records" options={{ headerShown: false }} />
      <Tabs.Screen name="appointments" options={{ headerShown: false }} />
    </Tabs>
  );
}
