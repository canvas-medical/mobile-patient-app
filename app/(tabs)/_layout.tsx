import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router/tabs';
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { g } from '@styles';

const s = StyleSheet.create({
  iconContainer: {
    borderRadius: g.size(28),
    width: g.size(56),
    height: g.size(56),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const tabIconSwitch = (tab: string, color: string, focused: boolean) => {
  switch (tab) {
    case 'my-health':
      return (
        <View
          style={{
            ...s.iconContainer,
            backgroundColor: focused ? g.primaryBlue : g.transparent,
          }}
        >
          <MaterialCommunityIcons name="view-dashboard-outline" size={g.size(32)} color={color} />
        </View>
      );
    case 'appointments':
      return (
        <View
          style={{
            ...s.iconContainer,
            backgroundColor: focused ? g.primaryBlue : g.transparent,
          }}
        >
          <MaterialCommunityIcons name="calendar-heart" size={g.size(36)} color={color} />
        </View>
      );
    case 'messages':
      return (
        <View
          style={{
            ...s.iconContainer,
            backgroundColor: focused ? g.primaryBlue : g.transparent,
          }}
        >
          <Feather name="message-circle" size={g.size(36)} color={color} />
        </View>
      );
    case 'billing':
      return (
        <View
          style={{
            ...s.iconContainer,
            backgroundColor: focused ? g.primaryBlue : g.transparent,
          }}
        >
          <FontAwesome5 name="file-invoice-dollar" size={g.size(28)} color={color} />
        </View>
      );
    default:
      return null;
  }
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: g.white,
        tabBarInactiveTintColor: g.neutral500,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: g.size(96),
          paddingTop: g.size(16),
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
          tabBarAccessibilityLabel: 'My Health',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => tabIconSwitch('my-health', color, focused),
          href: '/my-health/dashboard',
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          tabBarAccessibilityLabel: 'Appointments',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => tabIconSwitch('appointments', color, focused),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarAccessibilityLabel: 'Messages',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => tabIconSwitch('messages', color, focused),
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          tabBarAccessibilityLabel: 'Billing',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => tabIconSwitch('billing', color, focused),
        }}
      />
    </Tabs>
  );
}
