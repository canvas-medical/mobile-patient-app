import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: g.size(12),
    paddingLeft: g.size(16),
    paddingRight: g.size(8),
  },
  dataContainer: {
    gap: g.size(4),
    flex: 1,
    marginRight: g.size(16),
  },
  date: {
    ...g.bodyMedium,
    color: g.white,
  },
  label: {
    ...g.bodyLarge,
    color: g.white,
  },
});

export function ReportCard({ report }: { report: any }) { // TODO: type report
  const {
    date,
    type: {
      coding: [{ display: type }],
    }
  } = report;
  return (
    <View style={s.card}>
      <BlurView
        intensity={40}
        tint="light"
        style={s.cardBlur}
      >
        <View style={s.dataContainer}>
          <Text style={s.label}>
            {type}
          </Text>
          <Text style={s.date}>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </View>
        <Feather name="chevron-right" size={g.size(32)} color={g.white} />
      </BlurView>
    </View>
  );
}
