import { Screen, DashTabs } from '@components';
import { Slot } from 'expo-router';

export default function Dashboard() {
  return (
    <Screen style={{ flex: 1 }}>
      <Slot />
      <DashTabs />
    </Screen>
  );
}

// import { Tabs } from 'expo-router';

// export default function DashboardTabs() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="records" options={{ headerShown: false }} />
//       <Tabs.Screen name="appointments" options={{ headerShown: false }} />
//     </Tabs>
//   );
// }
