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
      return <MaterialCommunityIcons name="calendar-heart" size={g.size(32)} color={color} />;
    case 'messages':
      return <Feather name="message-circle" size={g.size(32)} color={color} />;
    case 'billing':
      return <FontAwesome5 name="file-invoice-dollar" size={g.size(28)} color={color} />;
    default:
      return null;
  }
};

export default function Layout() {
  return (
    <Tabs
      initialRouteName="my-health"
      screenOptions={{
        tabBarActiveTintColor: g.primaryBlue,
        tabBarLabelStyle: {
          ...g.bodySmall,
        },
      }}
    >
      <Tabs.Screen
        name="my-health"
        options={{
          title: 'My Health',
          tabBarAccessibilityLabel: 'My Health',
          headerShown: false,
          unmountOnBlur: true, // TODO: May not need on all tabs
          tabBarIcon: ({ color }) => tabIconSwitch('my-health', color),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarAccessibilityLabel: 'Appointments',
          headerShown: false,
          unmountOnBlur: true, // TODO: May not need on all tabs
          tabBarIcon: ({ color }) => tabIconSwitch('appointments', color),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarAccessibilityLabel: 'Messages',
          headerShown: false,
          unmountOnBlur: true, // TODO: May not need on all tabs
          tabBarIcon: ({ color }) => tabIconSwitch('messages', color),
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          title: 'Billing',
          tabBarAccessibilityLabel: 'Billing',
          headerShown: false,
          unmountOnBlur: true, // TODO: May not need on all tabs
          tabBarIcon: ({ color }) => tabIconSwitch('billing', color),
        }}
      />
    </Tabs>
  );
}
