import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { g } from '@styles';

const s = StyleSheet.create({
  cardContainer: {
    rowGap: g.size(16),
  },
  container: {
    flex: 1,
    gap: g.size(16),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...g.titleXSmall,
    color: g.black,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: g.size(8),
    alignItems: 'center',
  },
  viewAll: {
    ...g.bodyMedium,
    color: g.black,
    opacity: 0.9,
    padding: g.size(2),
  },
  zeroState: {
    ...g.bodyMedium,
    color: g.black,
    opacity: 0.8,
    paddingLeft: g.size(16),
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
          {icon}
          <Text style={s.label}>
            {title}
          </Text>
        </View>
        {viewAll && title !== 'Vitals' && (
          <TouchableOpacity onPress={() => router.push(viewAllRoute)}>
            <Text style={s.viewAll}>
              View All
            </Text>
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
