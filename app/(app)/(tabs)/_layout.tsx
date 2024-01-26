import { Platform } from 'react-native';
import { Tabs } from 'expo-router/tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TabBar } from '@components';
import { g } from '@styles';

const tabIconSwitch = (tab: string, color: string) => {
  switch (tab) {
    case 'my-health':
      return <MaterialCommunityIcons name="view-dashboard-outline" size={g.ms(32)} color={color} />;
    case 'appointments':
      return <MaterialCommunityIcons name="calendar-heart" size={g.ms(32)} color={color} />;
    case 'messages':
      return <Feather name="message-circle" size={g.ms(32)} color={color} />;
    case 'billing':
      return <Feather name="credit-card" size={g.ms(32)} color={color} />;
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
        tabBarInactiveTintColor: g.neutral600,
        tabBarHideOnKeyboard: Platform.OS === 'android',
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
