import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Slot } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Screen, DashTabs } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    paddingTop: g.size(64),
  },
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
  name: {
    ...g.titleSmall,
    color: g.white,
    fontSize: g.size(20),
    fontWeight: 'bold',
  },
  nameAndAvatarContainer: {
    alignItems: 'center',
    gap: g.size(8),
  },
});

export default function Dashboard() {
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
        style={s.drawerButton}
        onPress={() => null} // TODO: Open drawer
      >
        <Feather name="menu" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={s.messageButton}
        onPress={() => null} // TODO: Open messages
      >
        <Feather name="message-circle" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <DashTabs />
    </Screen>
  );
}
