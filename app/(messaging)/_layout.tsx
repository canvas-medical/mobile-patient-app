import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Screen, DashTabs } from '@components';
import { g } from '@styles';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Slot } from 'expo-router';

const s = StyleSheet.create({
  container: {
    paddingTop: g.size(140),
  },
  drawerButton: {
    position: 'absolute',
    top: g.size(64),
    left: g.size(32),
  },
  greeting: {
    ...g.bodySmall,
    color: g.white,
  },
  name: {
    ...g.labelMedium,
    color: g.white,
  },
  nameAndAvatarContainer: {
    position: 'absolute',
    top: g.size(64),
    right: g.size(32),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: g.size(8),
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
export default function MessagingLayout() {
  return (
    <Screen style={s.container}>
      <View style={s.nameAndAvatarContainer}>
        <View style={s.nameContainer}>
          <Text style={s.greeting}>Hello</Text>
          <Text style={s.name}>John Doe</Text>
        </View>
        <FontAwesome name="user-circle-o" size={g.size(36)} color={g.white} />
      </View>
      <TouchableOpacity
        style={s.drawerButton}
        onPress={() => null} // TODO: Open drawer
      >
        <Feather name="menu" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <Slot />
    </Screen>
  );
}
