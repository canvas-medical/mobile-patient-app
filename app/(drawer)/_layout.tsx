/* eslint-disable react/jsx-props-no-spreading */
import { StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import {
  Entypo,
  Feather,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { g } from '@styles';

const s = StyleSheet.create({
  header: {
    ...g.titleMedium,
    color: g.black,
    marginBottom: g.size(16),
  },
  menu: {
    borderBottomRightRadius: g.size(10),
    opacity: 0.97,
    padding: g.size(20),
  },
  menuItem: {
    marginLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(10),
  },
  menuItemText: {
    ...g.bodyLarge,
    color: g.black
  },
});

type IconProps = { focused: boolean; size: number; color: string; }

export default function Layout() {
  const navigation = useNavigation();
  const routes = {
    Dashboard: '(dashboard)',
    Medication: '(dashboard)',
    Appointments: '(dashboard)',
    Reports: '(dashboard)',
    Conditions: 'conditions',
    Immunizations: 'immunizations',
    Allergies: 'allergies',
    Goals: 'goals',
    Documents: '(dashboard)',
    Invoices: 'invoices',
    'Bill Pay': '(dashboard)'
  };

  // TODO: leaving unused focused param here until we can figure out how to get it to work
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getIconByText = (text: string, color: string, size: number, focused: any) => {
    switch (text.toLowerCase()) {
      case 'dashboard':
        return (
          <View style={s.menuItem}>
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'medication':
        return (
          <View style={s.menuItem}>
            <MaterialCommunityIcons name="arrow-right-bottom" size={size} color={g.black} />
            <MaterialCommunityIcons name="calendar-clock-outline" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'appointments':
        return (
          <View style={s.menuItem}>
            <MaterialCommunityIcons name="arrow-right-bottom" size={size} color={g.black} />
            <MaterialCommunityIcons name="pill" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'reports':
        return (
          <View style={s.menuItem}>
            <MaterialCommunityIcons name="arrow-right-bottom" size={size} color={g.black} />
            <Entypo name="box" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'conditions':
        return (
          <View style={s.menuItem}>
            <FontAwesome5 name="heartbeat" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'immunizations':
        return (
          <View style={s.menuItem}>
            <Fontisto name="injection-syringe" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'allergies':
        return (
          <View style={s.menuItem}>
            <MaterialCommunityIcons name="peanut-off-outline" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'goals':
        return (
          <View style={s.menuItem}>
            <Feather name="target" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'documents':
        return (
          <View style={s.menuItem}>
            <MaterialCommunityIcons name="file-check-outline" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'invoices':
        return (
          <View style={s.menuItem}>
            <FontAwesome5 name="file-invoice-dollar" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      case 'bill pay':
        return (
          <View style={s.menuItem}>
            <Feather name="credit-card" size={size} color={g.black} />
            <Text style={s.menuItemText}>{text}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const drawerContent = (props: any) => (
    <DrawerContentScrollView {...props}>
      <View style={s.menu}>
        <Text style={s.header}>Brewer Digital</Text>
        {Object.keys(routes).map((route) => (
          <DrawerItem
            key={route}
            label={route}
            labelStyle={s.menuItemText}
            style={s.menuItem}
            onPress={() => navigation.navigate(routes[route] as never)}
            icon={({ color, size, focused }: IconProps) => getIconByText(route, color, size, focused)}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );

  // TODO: replace custom drawerContent with Drawer.Screen when all of our routes exist
  return (
    <Drawer
      screenOptions={{ headerShown: false }}
      drawerContent={drawerContent}
    />
  );
}
