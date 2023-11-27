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
    gap: g.size(20)
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    ...g.bodyLarge,
    color: g.black
  },
});

type IconProps = { focused: boolean; size: number; color: string; }

const getIconByText = (text: string, color: string) => {
  switch (text.toLowerCase()) {
    case 'dashboard':
      return (
        <>
          <MaterialCommunityIcons name="view-dashboard-outline" size={24} color={color} />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'medication':
      return (
        <>
          <MaterialCommunityIcons name="arrow-right-bottom" size={24} color="black" />
          <MaterialCommunityIcons name="calendar-clock-outline" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'appointments':
      return (
        <>
          <MaterialCommunityIcons name="arrow-right-bottom" size={24} color="black" />
          <MaterialCommunityIcons name="pill" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'records':
      return (
        <>
          <MaterialCommunityIcons name="arrow-right-bottom" size={24} color="black" />
          <Entypo name="box" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'conditions':
      return (
        <>
          <FontAwesome5 name="heartbeat" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'immunizations':
      return (
        <>
          <Fontisto name="injection-syringe" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'allergies':
      return (
        <>
          <MaterialCommunityIcons name="peanut-off-outline" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'goals':
      return (
        <>
          <Feather name="target" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'documents':
      return (
        <>
          <MaterialCommunityIcons name="file-check-outline" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
      );

    case 'bill pay':
      return (
        <>
          <Feather name="credit-card" size={24} color="black" />
          <Text style={s.menuItemText}>{text}</Text>
        </>
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
              icon={({ color, size, focused }: IconProps) => getIconByText('Dashboard')}
            />
            <DrawerItem
              label="Medication"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Medication')}
            />
            <DrawerItem
              label="Appointments"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Appointments')}
            />
            <DrawerItem
              label="Records"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Records')}
            />
            <DrawerItem
              label="Conditions"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Conditions')}
            />
            <DrawerItem
              label="Immunizations"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Immunizations')}
            />
            <DrawerItem
              label="Allergies"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Allergies')}
            />
            <DrawerItem
              label="Goals"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Goals')}
            />
            <DrawerItem
              label="Documents"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Documents')}
            />
            <DrawerItem
              label="Bill Pay"
              labelStyle={s.menuItemText}
              style={s.menuItem}
              onPress={() => onPress()}
              icon={({ color, size, focused }: IconProps) => getIconByText('Bill Pay', color)}
            />
          </View>
        </DrawerContentScrollView>
      )}
    />
  );
}
