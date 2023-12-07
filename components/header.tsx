import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { router, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { usePatient } from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    paddingTop: g.size(72),
    paddingLeft: g.size(32),
    paddingRight: g.size(24),
    marginBottom: g.size(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(8),
  },
  nameContainer: {
    alignItems: 'flex-end',
  },
});
export function Header() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { data: { name } } = usePatient();
  const patientName = `${name[0].given[0]} ${name[0].family}`;
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={s.nameAndAvatarContainer}
        onPress={() => {
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
                  SecureStore.deleteItemAsync('push_token');
                  router.replace('initial');
                },
              },
            ]
          );
        }}
      >
        <View style={s.nameContainer}>
          <Text style={s.greeting}>Hello</Text>
          <Text style={s.name}>{patientName}</Text>
        </View>
        <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
    </View>
  );
}
