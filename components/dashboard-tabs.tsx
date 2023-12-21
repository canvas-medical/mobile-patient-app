import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { router, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { g } from '@styles';
import { BlurFill } from '@components/blur-fill';

const s = StyleSheet.create({
  activeTab: {
    opacity: 0.8,
  },
  buttonBlur: {
    width: '100%',
    paddingVertical: g.size(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    ...g.shadow,
    position: 'absolute',
    bottom: g.size(32),
    left: '50%',
    transform: [{ translateX: g.size(-140) }],
    width: g.size(280),
  },
  inactiveTab: {
    opacity: 0.5,
  },
  tabBlur: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabDivider: {
    width: g.size(1),
    marginVertical: g.size(2),
    backgroundColor: g.white,
  },
  tabs: {
    overflow: 'hidden',
    borderRadius: g.size(24),
    flex: 1,
  },
});

export function DashTabs() {
  const pathname = usePathname();
  return (
    <View style={s.container}>
      <View style={s.tabs}>
        <TouchableOpacity
          style={s.tabButton}
          onPress={() => router.push('appointments-medications')}
          disabled={pathname === '/appointments-medications'}
        >
          <MaterialCommunityIcons
            name="calendar-heart"
            size={40}
            color={g.primaryBlue}
            style={pathname === '/appointments-medications' ? s.activeTab : s.inactiveTab}
          />
          <BlurFill
            intensity={pathname === '/appointments-medications' ? 60 : 0}
          />
        </TouchableOpacity>
        <View style={s.tabDivider} />
        <TouchableOpacity
          style={s.tabButton}
          onPress={() => router.push('metrics-reports')}
          disabled={pathname === '/metrics-reports'}
        >
          <MaterialCommunityIcons
            name="inbox"
            size={40}
            color={g.primaryBlue}
            style={pathname === '/metrics-reports' ? s.activeTab : s.inactiveTab}
          />
          <BlurFill
            intensity={pathname === '/metrics-reports' ? 60 : 0}
          />
        </TouchableOpacity>
        <BlurFill
          intensity={90}
        />
      </View>
    </View>
  );
}
