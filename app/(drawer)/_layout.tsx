import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Entypo,
  Feather,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { g } from '@styles';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

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

const getIconByText = (text: string, color: string, size: number, focused: any) => {
  console.log(text, focused, size);
  switch (text.toLowerCase()) {
    case 'dashboard':
      return (
        <View style={s.menuItem}>
          <MaterialCommunityIcons name="view-dashboard-outline" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'medication':
      return (
        <View style={s.menuItem}>
          <MaterialCommunityIcons name="arrow-right-bottom" size={size} color="black" />
          <MaterialCommunityIcons name="calendar-clock-outline" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'appointments':
      return (
        <View style={s.menuItem}>
          <MaterialCommunityIcons name="arrow-right-bottom" size={size} color="black" />
          <MaterialCommunityIcons name="pill" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'records':
      return (
        <View style={s.menuItem}>
          <MaterialCommunityIcons name="arrow-right-bottom" size={size} color="black" />
          <Entypo name="box" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'conditions':
      return (
        <View style={s.menuItem}>
          <FontAwesome5 name="heartbeat" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'immunizations':
      return (
        <View style={s.menuItem}>
          <Fontisto name="injection-syringe" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'allergies':
      return (
        <View style={s.menuItem}>
          <MaterialCommunityIcons name="peanut-off-outline" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'goals':
      return (
        <View style={s.menuItem}>
          <Feather name="target" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'documents':
      return (
        <View style={s.menuItem}>
          <MaterialCommunityIcons name="file-check-outline" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );

    case 'bill pay':
      return (
        <View style={s.menuItem}>
          <Feather name="credit-card" size={size} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </View>
      );
    default:
      return null;
  }
};
export default function Layout() {
  const onPress = (route?: string) => {
    console.log(route);
    // navigation.navigate(route || '(dashboard)');
  };
  return (
    <Drawer
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View style={s.menu}>
            <Text style={s.header}>Brewer Digital</Text>
            <DrawerItem
              label="Dashboard"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Dashboard', color, size, focused)}
            />
            <DrawerItem
              label="Medication"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Medication', color, size, focused)}
            />
            <DrawerItem
              label="Appointments"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Appointments', color, size, focused)}
            />
            <DrawerItem
              label="Records"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Records', color, size, focused)}
            />
            <DrawerItem
              label="Conditions"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Conditions', color, size, focused)}
            />
            <DrawerItem
              label="Immunizations"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Immunizations', color, size, focused)}
            />
            <DrawerItem
              label="Allergies"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Allergies', color, size, focused)}
            />
            <DrawerItem
              label="Goals"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Goals', color, size, focused)}
            />
            <DrawerItem
              label="Documents"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Documents', color, size, focused)}
            />
            <DrawerItem
              label="Bill Pay"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Bill Pay', color, size, focused)}
            />
          </View>
        </DrawerContentScrollView>
      )}
    />
  );
}
