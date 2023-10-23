import { Tabs } from 'expo-router';

export default function DashboardTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="records" options={{ headerShown: false }} />
      <Tabs.Screen name="appointments" options={{ headerShown: false }} />
    </Tabs>
  );
}
