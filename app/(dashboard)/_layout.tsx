import { Screen, DashTabs } from '@components';
import {
  TouchableOpacity, Text, View, TouchableWithoutFeedback, StyleSheet
} from 'react-native';
import { Slot } from 'expo-router';
import { g } from '@styles';
import { useState } from 'react';
import Modal from 'react-native-modal';
import {
  Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons, Entypo, Fontisto
} from '@expo/vector-icons';

const s = StyleSheet.create({
  container: {
    paddingTop: g.size(64),
  },
  drawerButton: {
    position: 'absolute',
    top: g.size(64),
    left: g.size(32),
  },
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
  messageButton: {
    position: 'absolute',
    top: g.size(64),
    right: g.size(32),
  },
  modal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  name: {
    ...g.titleSmall,
    color: g.white,
    fontSize: g.size(20),
    fontWeight: 'bold',
  },
  nameAndAvatarContainer: {
    alignItems: 'center',
    gap: g.size(8),
  }

});

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Screen style={s.container}>
      <View style={s.nameAndAvatarContainer}>
        <FontAwesome name="user-circle-o" size={g.size(96)} color={g.white} />
        <Text style={s.name}>
          John Doe
        </Text>
      </View>
      <Slot />
      <TouchableOpacity
        onPress={() => setMenuOpen(!menuOpen)}
        style={s.drawerButton}
      >
        <Feather name="menu" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={s.messageButton}
        onPress={() => null} // TODO: Open messages
      >
        <Feather name="message-circle" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <Modal
        style={s.modal}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        isVisible={menuOpen}
        customBackdrop={(
          <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        )}
      >
        <View style={s.menu}>
          <Text style={s.header}>Brewer Digital</Text>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <MaterialCommunityIcons name="view-dashboard-outline" size={g.size(24)} color={g.black} />
            <Text style={s.menuItemText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <MaterialCommunityIcons name="arrow-right-bottom" size={g.size(24)} color="black" />
            <MaterialCommunityIcons name="calendar-clock-outline" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Medication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <MaterialCommunityIcons name="arrow-right-bottom" size={g.size(24)} color="black" />
            <MaterialCommunityIcons name="pill" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <MaterialCommunityIcons name="arrow-right-bottom" size={g.size(24)} color="black" />
            <Entypo name="box" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Records</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <FontAwesome5 name="heartbeat" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <Fontisto name="injection-syringe" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Immunizations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <MaterialCommunityIcons name="peanut-off-outline" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Allergies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <Feather name="target" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <MaterialCommunityIcons name="file-check-outline" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.menuItem} onPress={() => setMenuOpen(false)}>
            <Feather name="credit-card" size={g.size(24)} color="black" />
            <Text style={s.menuItemText}>Bill Pay</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <DashTabs />
    </Screen>
  );
}
