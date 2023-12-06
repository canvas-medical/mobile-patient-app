import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { router, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { usePatient } from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    height: g.size(125)
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
export function Header() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { data: { name } } = usePatient();
  const patientName = `${name[0].given[0]} ${name[0].family}`;
  return (
    <View style={s.container}>
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
      <TouchableOpacity
        style={s.drawerButton}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
    </View>
  );
}
