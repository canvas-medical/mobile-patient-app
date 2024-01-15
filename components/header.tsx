import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { router, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { usePatient } from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  backButton: {
    marginLeft: g.size(8),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: g.size(72),
    paddingHorizontal: g.size(16),
    paddingBottom: g.size(4),
  },
  label: {
    ...g.labelMedium,
    color: g.white,
  },
  nameAndAvatarContainer: {
    minHeight: g.size(48),
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(8),
    marginRight: g.size(8),
    marginLeft: 'auto',
  },
  userImage: {
    width: g.size(48),
    height: g.size(48),
    borderRadius: g.size(24),
  }
});

export function Header({ hideBackButton = false }: { hideBackButton?: boolean }) {
  const navigation = useNavigation();
  const { data } = usePatient();

  return (
    <View style={s.container}>
      {!hideBackButton && (
        <TouchableOpacity
          style={s.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={g.size(48)} color={g.white} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={s.nameAndAvatarContainer}
        onPress={() => router.push('profile-modal')}
        activeOpacity={0}
      >
        <Text style={s.label}>{`${data?.name[0]?.given[0] || ''} ${data?.name[0]?.family || ''}`}</Text>
        {Array.isArray(data?.photo) ? (
          <Image source={{ uri: data.photo[0].url }} style={s.userImage} />
        ) : <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />}
      </TouchableOpacity>
    </View>
  );
}
