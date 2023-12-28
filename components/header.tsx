import { useRef, useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { usePatient } from '@services';
import { ProfileCard } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
  },
  backButton: {
    marginLeft: g.size(8),
  },
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(8),
    paddingRight: g.size(8),
  },
  container: {
    paddingTop: g.size(72),
    paddingHorizontal: g.size(16),
    paddingBottom: g.size(4),
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greeting: {
    ...g.bodySmall,
    color: g.white,
    height: g.size(16),
    width: '100%',
    textAlign: 'right',
  },
  label: {
    ...g.labelMedium,
    color: g.white,
  },
  labelContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const { data } = usePatient();

  const heightValue = useRef(new Animated.Value(0)).current;
  const paddingValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  function toggleProfile() {
    Animated.timing(heightValue, {
      toValue: openProfile ? 0 : g.size(225),
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    Animated.timing(paddingValue, {
      toValue: openProfile ? 0 : g.size(12),
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacityValue, {
      toValue: openProfile ? 0 : 1,
      duration: openProfile ? 250 : 600,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setOpenProfile(!openProfile);
  }

  return (
    <View style={s.container}>
      <View style={s.controlsContainer}>
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
          onPress={() => toggleProfile()}
          activeOpacity={0}
        >
          {openProfile ? (
            <View style={s.closeContainer}>
              <View style={s.labelContainer}>
                <Text style={s.label}>Close</Text>
              </View>
              <AntDesign name="closecircleo" size={g.size(24)} color={g.white} />
            </View>
          ) : (
            <>
              <View style={s.labelContainer}>
                <Text style={s.greeting}>Hello</Text>
                <Text style={s.label}>{`${data?.name[0]?.given[0] || ''} ${data?.name[0]?.family || ''}`}</Text>
              </View>
              {Array.isArray(data?.photo) ? (
                <Image source={{ uri: data.photo[0].url }} style={s.userImage} />
              ) : <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />}
            </>
          )}
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          s.animatedContainer,
          {
            maxHeight: heightValue,
            paddingTop: paddingValue,
            opacity: opacityValue,
          },
        ]}
      >
        <ProfileCard data={data} />
      </Animated.View>
    </View>
  );
}
