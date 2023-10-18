import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { g } from '@styles';
import { router, usePathname } from 'expo-router';

const s = StyleSheet.create({
  inactiveTab: {
    opacity: 0.5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    ...g.shadow,
    paddingVertical: g.size(8),
    borderRadius: g.size(24),
    position: 'absolute',
    bottom: g.size(32),
    left: '50%',
    transform: [{ translateX: g.size(-140) }],
    width: g.size(280),
    backgroundColor: g.white,
    flexDirection: 'row',
  },
  tabDivider: {
    width: g.size(1),
    backgroundColor: g.neutral
  }
});

export function DashTabs() {
  const pathname = usePathname();
  return (
    <View style={s.tabContainer}>
      <TouchableOpacity
        style={s.tabButton}
        onPress={() => router.push('/records')}
        disabled={pathname === '/records'}
      >
        <MaterialCommunityIcons
          name="inbox"
          size={40}
          color={g.primaryBlue}
          style={pathname !== '/records' && s.inactiveTab}
        />
      </TouchableOpacity>
      <View style={s.tabDivider} />
      <TouchableOpacity
        style={s.tabButton}
        onPress={() => router.push('/appointments')}
        disabled={pathname === '/appointments'}
      >
        <MaterialCommunityIcons
          name="calendar-heart"
          size={40}
          color={g.primaryBlue}
          style={pathname !== '/appointments' && s.inactiveTab}
        />
      </TouchableOpacity>
    </View>
  );
}
