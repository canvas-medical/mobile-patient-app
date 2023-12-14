import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { g } from '@styles';
import { router } from 'expo-router';

const s = StyleSheet.create({
  diagnosticContainer: {
    rowGap: g.size(16),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: g.size(8),
    alignItems: 'center',
  },
  sectionContainer: {
    flex: 1,
    gap: g.size(16),
  },
  viewAll: {
    ...g.bodySmall,
    color: g.white,
    opacity: 0.8,
  },
  zeroState: {
    ...g.bodyMedium,
    color: g.white,
    opacity: 0.8,
    paddingLeft: g.size(16),
  },
});
export function MyHealthBlock(
  { children, viewAllRoute, title, icon, viewAll }:
    { children: any, title: string, icon: any, viewAllRoute?: string, viewAll: boolean }
) {
  return (
    <View style={s.sectionContainer}>
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
      <View style={s.diagnosticContainer}>
        {children}
        {!children?.length && title !== 'Vitals' && (
          <Text style={s.zeroState}>
            No
            {' '}
            {title}
          </Text>
        )}
      </View>
    </View>
  );
}
