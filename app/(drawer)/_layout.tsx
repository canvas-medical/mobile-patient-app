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
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@node_modules/react-native-screens/lib/typescript/native-stack';

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
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const routes = {
    Dashboard: '(dashboard)',
    Medication: '(dashboard)',
    Appointments: '(dashboard)',
    Records: '(dashboard)',
    Conditions: '(dashboard)',
    Immunizations: '(dashboard)',
    Allergies: '(dashboard)',
    Goals: '(dashboard)',
    Documents: '(dashboard)',
    'Bill Pay': '(dashboard)'
  };

  const getIconByText = (text: string, color: string, size: number, focused: any) => {
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

  return (
    <Drawer
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <View style={s.menu}>
            <Text style={s.header}>Brewer Digital</Text>
            {Object.keys(routes).map((route) => (
              <DrawerItem
                label={route}
                labelStyle={s.menuItemText}
                style={s.menuItem}
                onPress={() => navigation.navigate(routes[route])}
                icon={({ color, size, focused }: IconProps) => getIconByText(route, color, size, focused)}
              />
            ))}
          </View>
        </DrawerContentScrollView>
      )}
    />
  );
}
