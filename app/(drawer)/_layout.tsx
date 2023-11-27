import { DashTabs, Screen } from '@components';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { g } from '@styles';
import { Slot } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

const s = StyleSheet.create({
  header: {
    ...g.titleMedium,
    color: g.black,
    marginBottom: g.size(16),
  },
  menu: {
    height: g.size(570),
    width: g.size(275),
    backgroundColor: g.white,
    borderBottomRightRadius: g.size(10),
    opacity: 0.97,
    padding: g.size(30),
    paddingTop: g.size(50),
    gap: g.size(20)
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(15)
  },
  menuItemText: {
    ...g.bodyLarge
  },
});

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(dashboard)" // This is the name of the page and must match the url from root
        options={{
          drawerLabelStyle: s.menuItemText,
          drawerLabel: 'Appointments',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
          )
        }}
      />
      {/* <Text style={s.menuItemText}>Dashboard</Text> */}

      {/* <MaterialCommunityIcons name="arrow-right-bottom" size={g.size(24)} color="black" /> */}
      {/* <MaterialCommunityIcons name="calendar-clock-outline" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Medication</Text> */}

      {/* <MaterialCommunityIcons name="arrow-right-bottom" size={g.size(24)} color="black" /> */}
      {/* <MaterialCommunityIcons name="pill" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Appointments</Text> */}

      {/* <MaterialCommunityIcons name="arrow-right-bottom" size={g.size(24)} color="black" /> */}
      {/* <Entypo name="box" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Records</Text> */}

      {/* <FontAwesome5 name="heartbeat" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Conditions</Text> */}

      {/* <Fontisto name="injection-syringe" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Immunizations</Text> */}

      {/* <MaterialCommunityIcons name="peanut-off-outline" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Allergies</Text> */}

      {/* <Feather name="target" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Goals</Text> */}

      {/* <MaterialCommunityIcons name="file-check-outline" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Documents</Text> */}

      {/* <Feather name="credit-card" size={g.size(24)} color="black" /> */}
      {/* <Text style={s.menuItemText}>Bill Pay</Text> */}
    </Drawer>
  );
}
