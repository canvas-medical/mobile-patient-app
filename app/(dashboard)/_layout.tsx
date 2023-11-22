import { Screen, DashTabs } from '@components';
import {
  SafeAreaView, TouchableOpacity, Text, View, TouchableWithoutFeedback, StyleSheet
} from 'react-native';
import { Slot } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { g } from '@styles';
import { useState } from 'react';
import Modal from 'react-native-modal';

const s = StyleSheet.create({
  menu: {
    height: g.height * 0.7,
    width: g.width * 0.7,
    backgroundColor: g.white,
    borderBottomRightRadius: g.size(10),
    opacity: 0.85,
    padding: g.size(20),
    paddingTop: g.size(50)
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemText: {
    ...g.labelSmall
  },
  modal: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start'
  }
});

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Screen>
      <SafeAreaView>
        {!menuOpen
        && (
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Feather
            name="menu"
            size={36}
            color={g.white}
            style={{ left: 30 }}
          />
        </TouchableOpacity>
        )
        }
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
            <Text style={g.header}>Brewer Digital</Text>
            <View style={s.menuItem}>
              <Feather
                name="circle"
                size={36}
                color={g.black}
              />
              <Text style={s.menuItemText}>Brewer Digital</Text>
            </View>
          </View>
        </Modal>
        <Slot />
      </SafeAreaView>
      <DashTabs />
    </Screen>
  );
}
