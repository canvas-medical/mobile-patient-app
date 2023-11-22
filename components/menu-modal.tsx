import Modal from 'react-native-modal';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Entypo, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { g } from '@styles';

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
  modal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start'
  },
});

export default function MenuModal({ menuOpen, setMenuOpen }) {
  return (
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
  );
}
