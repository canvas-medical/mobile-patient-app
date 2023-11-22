import { Screen, DashTabs } from '@components';
import { SafeAreaView, TouchableOpacity, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Slot } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { g } from '@styles';
import { useState } from 'react';
import Modal from 'react-native-modal';

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Screen>
      <SafeAreaView>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Feather
            name="menu"
            size={36}
            color={g.white}
            style={{ left: 30 }}
          />
        </TouchableOpacity>
        <Modal
          style={{ margin: 0, display: 'flex', justifyContent: 'flex-start' }}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          isVisible={menuOpen}
          customBackdrop={(
            <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
          )}
        >
          <View style={{ height: g.height * 0.5, width: g.width * 0.5, backgroundColor: g.white }}>
            <Text>Hello</Text>
          </View>
        </Modal>
        <Slot />
      </SafeAreaView>
      <DashTabs />
    </Screen>
  );
}
