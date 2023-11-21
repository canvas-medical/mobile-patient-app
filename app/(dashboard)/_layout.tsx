import { StyleSheet, TouchableOpacity } from 'react-native';
import { Slot } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, DashTabs } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  drawerButton: {
    position: 'absolute',
    top: g.size(64),
    left: g.size(32),
  },
  messageButton: {
    position: 'absolute',
    top: g.size(64),
    right: g.size(32),
  },
});

export default function Dashboard() {
  return (
    <Screen>
      <Slot />
      <TouchableOpacity
        style={s.drawerButton}
        onPress={() => null}
      >
        <Feather name="menu" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={s.messageButton}
        onPress={() => null}
      >
        <Feather name="message-circle" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <DashTabs />
    </Screen>
  );
}
