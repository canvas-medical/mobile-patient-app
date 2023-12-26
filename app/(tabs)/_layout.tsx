import { Platform } from 'react-native';
import { Tabs } from 'expo-router/tabs';
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { g } from '@styles';

const tabIconSwitch = (tab: string, color: string) => {
  switch (tab) {
    case 'my-health':
      return <MaterialCommunityIcons name="view-dashboard-outline" size={g.size(32)} color={color} />;
    case 'appointments':
      return <MaterialCommunityIcons name="calendar-heart" size={g.size(36)} color={color} />;
    case 'messages':
      return <Feather name="message-circle" size={g.size(36)} color={color} />;
    case 'billing':
      return <FontAwesome5 name="file-invoice-dollar" size={g.size(28)} color={color} />;
    default:
      return null;
  }
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: g.primaryBlue,
        tabBarInactiveTintColor: g.neutral500,
        tabBarHideOnKeyboard: Platform.OS === 'android',
        tabBarStyle: {
          height: g.size(96),
          paddingTop: g.size(8),
          backgroundColor: g.white,
          borderTopLeftRadius: g.size(48),
          borderTopRightRadius: g.size(48),
          position: 'absolute',
          bottom: 0,
        },
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
