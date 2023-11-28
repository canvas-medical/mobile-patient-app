import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { Slot, useRouter, useNavigation } from 'expo-router';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
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

export default function Layout() {
  const navigation = useNavigation();
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
        // @ts-ignore This must be ignored because openDrawer does not exist on the default useNavigation export
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={s.messageButton}
        onPress={() => { // TODO: Open message modal
          Alert.alert(
            'Are you sure?',
            'This will delete all of your data and log you out.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Log Out',
                style: 'destructive',
                onPress: () => {
                  SecureStore.deleteItemAsync('patient_id');
                  router.replace('initial');
                },
              },
            ],
          );
        }}
      >
        <Feather name="message-circle" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <DashTabs />
    </Screen>
  );
}
