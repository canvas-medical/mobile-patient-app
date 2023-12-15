import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { usePatient } from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    paddingTop: g.size(72),
    paddingLeft: g.size(32),
    paddingRight: g.size(24),
    marginBottom: g.size(4),
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
  const { data } = usePatient();
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={s.nameAndAvatarContainer}
        onPress={() => {
          router.push('profile');
        }}
      >
        <View style={s.nameContainer}>
          <Text style={s.greeting}>Hello</Text>
          <Text style={s.name}>{`${data?.name[0]?.given[0]} ${data?.name[0]?.family}`}</Text>
        </View>
        <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />
      </TouchableOpacity>
    </View>
  );
}
