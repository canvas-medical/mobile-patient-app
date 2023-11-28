import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Screen, DashTabs } from '@components';
import { g } from '@styles';
import { usePatient } from '@services';

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
    marginBottom: g.size(24),
  },
});

export default function Dashboard() {
  const router = useRouter();
  const { data: { name } } = usePatient();
  const patientName = `${name[0].given[0]} ${name[0].family}`;
  return (
    <Screen style={s.container}>
      <View style={s.nameAndAvatarContainer}>
        <FontAwesome name="user-circle-o" size={g.size(96)} color={g.white} />
        <Text style={s.name}>
          {patientName}
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
        onPress={() => {
          router.push('messaging');
        }}
      >
        <Feather name="message-circle" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <DashTabs />
    </Screen>
  );
}
