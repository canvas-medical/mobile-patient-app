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
import graphic from '@assets/images/graphic.png';

const s = StyleSheet.create({
  backButton: {
    marginLeft: g.ws(8),
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: g.tertiaryBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: g.hs(16),
    paddingTop: g.hs(48),
  },
  graphic: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: g.width * 0.5,
    aspectRatio: 1.4,
    transform: [
      { scaleX: -1 }
    ]
  },
  name: {
    ...g.titleSmall,
    color: g.white,
  },
  nameAndAvatarContainer: {
    minHeight: g.hs(48),
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.ws(8),
    marginLeft: 'auto',
  },
  userImage: {
    width: g.hs(48),
    height: g.hs(48),
    borderRadius: g.ms(24),
  }
});

export function Header({ hideBackButton = false }: { hideBackButton?: boolean }) {
  const navigation = useNavigation();
  const { data } = usePatient();

  return (
    <View style={s.container}>
      <Image
        style={s.graphic}
        source={graphic}
      />
      {!hideBackButton && (
        <TouchableOpacity
          style={s.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={g.ms(40)} color={g.white} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={s.nameAndAvatarContainer}
        onPress={() => router.push('profile-modal')}
        activeOpacity={0}
      >
        <Text style={s.name}>{`${data?.name ? data?.name[0]?.given[0] : ''} ${data?.name ? data?.name[0]?.family : ''}`}</Text>
        {data?.photo
          ? <Image source={{ uri: data?.photo[0].url }} style={s.userImage} />
          : <FontAwesome name="user-circle-o" size={g.hs(48)} color={g.white} />}
      </TouchableOpacity>
    </View>
  );
}
