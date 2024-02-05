import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { g } from '@styles';

const s = StyleSheet.create({
  cardContainer: {
    rowGap: g.hs(12),
  },
  container: {
    flex: 1,
    gap: g.hs(16),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: g.ms(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...g.titleXSmall,
    color: g.neutral700,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: g.ms(4),
    alignItems: 'center',
  },
  viewAll: {
    ...g.labelSmall,
    color: g.tertiaryBlue,
    opacity: 0.9,
    padding: g.ms(2),
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    top: g.hs(1),
  },
  zeroState: {
    ...g.bodyMedium,
    color: g.neutral700,
    opacity: 0.8,
    marginLeft: g.ms(32),
    marginTop: -g.hs(8),
  },
});
export function MyHealthBlock(
  {
    children,
    viewAllRoute,
    title,
    icon,
    viewAll,
    loading,
  }: {
    children: ReactNode,
    title: string,
    icon: any,
    viewAllRoute?: string,
    viewAll: boolean,
    loading: boolean,
  }
) {
  return (
    <View style={s.container}>
      <View style={s.headerContainer}>
        <View style={s.labelContainer}>
          <View style={s.iconContainer}>
            {icon}
          </View>
          <Text style={s.label}>
            {title}
          </Text>
        </View>
        {viewAll && title !== 'Vitals' && (
          <TouchableOpacity
            style={s.viewAllButton}
            onPress={() => router.push(viewAllRoute)}
          >
            <Text style={s.viewAll}>
              View All
            </Text>
            <Feather name="chevron-right" size={g.ms(14)} color={g.tertiaryBlue} />
          </TouchableOpacity>
        )}
      </View>
      <View style={s.cardContainer}>
        {children}
        {Array.isArray(children) && !children.length && title !== 'Vitals' && !loading && (
          <Text style={s.zeroState}>
            No Active
            {' '}
            {title}
          </Text>
        )}
      </View>
    </View>
  );
}
