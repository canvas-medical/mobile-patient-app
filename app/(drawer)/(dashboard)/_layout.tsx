import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Entypo, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons, FontAwesome
} from '@expo/vector-icons';
import { Slot, useNavigation } from 'expo-router';
import * as routing from 'expo-router';

import { g } from '@styles';
import { DashTabs, Screen } from '@components';

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
  }
});

export default function Layout() {
  const navigation = useNavigation();
  console.log('everything from expo router', routing);
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
        onPress={() => navigation.openDrawer()}
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
