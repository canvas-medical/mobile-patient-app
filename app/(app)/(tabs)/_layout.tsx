import { Tabs } from 'expo-router/tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TabBar } from '@components';
import { g } from '@styles';

const tabIconSwitch = (tab: string, color: string) => {
  switch (tab) {
    case 'my-health':
      return <MaterialCommunityIcons name="view-dashboard-outline" size={g.size(32)} color={color} />;
    case 'appointments':
      return <MaterialCommunityIcons name="calendar-heart" size={g.size(32)} color={color} />;
    case 'messages':
      return <Feather name="message-circle" size={g.size(32)} color={color} />;
    case 'billing':
      return <Feather name="credit-card" size={g.size(32)} color={color} />;
    default:
      return null;
  }
};

export default function Layout() {
  return (
    <Tabs
      tabBar={TabBar}
      screenOptions={{
        tabBarActiveTintColor: g.white,
        tabBarInactiveTintColor: g.newNeutral600,
        // tabBarHideOnKeyboard: Platform.OS === 'android',
        // tabBarStyle: {
        //   height: Platform.OS === 'android' ? g.size(72) : g.size(88),
        //   paddingBottom: Platform.OS === 'android' ? g.size(12) : g.size(24),
        //   backgroundColor: g.white,
        //   borderTopLeftRadius: g.size(48),
        //   borderTopRightRadius: g.size(48),
        //   position: 'absolute',
        //   bottom: 0,
        // },
        // tabBarIconStyle: {
        //   marginTop: g.size(8),
        // },
      }}
    >
      <Tabs.Screen
        name="my-health"
        options={{
          title: 'My Health',
          tabBarAccessibilityLabel: 'My Health',
          headerShown: false,
          tabBarIcon: ({ color }) => tabIconSwitch('my-health', color),
          href: '/my-health/dashboard',
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarAccessibilityLabel: 'Appointments',
          headerShown: false,
          tabBarIcon: ({ color }) => tabIconSwitch('appointments', color),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          unmountOnBlur: true,
          title: 'Messages',
          tabBarAccessibilityLabel: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color }) => tabIconSwitch('messages', color),
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          title: 'Billing',
          tabBarAccessibilityLabel: 'Billing',
          headerShown: false,
          tabBarIcon: ({ color }) => tabIconSwitch('billing', color),
        }}
      />
    </Tabs>
  );
}
