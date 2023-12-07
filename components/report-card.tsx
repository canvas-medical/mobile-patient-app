import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Report } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  blur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: g.size(12),
    paddingLeft: g.size(16),
    paddingRight: g.size(8),
  },
  container: {
    borderRadius: g.size(8),
    overflow: 'hidden',
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

export function ReportCard({ report }: { report: Report }) {
  const {
    date,
    type: { coding: [{ display: type }] },
    content: [{ attachment: { url: uri } }]
  } = report;

  return (
    <TouchableOpacity
      style={s.container}
      onPress={() =>
        router.push({
          pathname: 'pdf-modal',
          params: { uri }
        })}
      disabled={!uri}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={s.blur}
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
        {!!uri && <Feather name="chevron-right" size={g.size(32)} color={g.white} />}
      </BlurView>
    </TouchableOpacity>
  );
}
