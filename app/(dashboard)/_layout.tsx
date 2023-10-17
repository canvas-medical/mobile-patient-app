import { Screen, DashTabs } from '@components';
import { Slot } from 'expo-router';

export default function Dashboard() {
  return (
    <Screen>
      <Slot />
      <DashTabs />
    </Screen>
  );
}
