import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from '@utils';
import { Immunization } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
  },
  date: {
    ...g.bodySmall,
    color: g.black,
    alignSelf: 'flex-end',
  },
  label: {
    ...g.labelMedium,
    color: g.black,
    maxWidth: '92%',
  },
});

export function ImmunizationCard({ immunization }: { immunization: Immunization }) {
  const {
    vaccineCode: { coding: [{ display = '' } = {}] = [] } = {},
    occurrenceDateTime = ''
  } = immunization ?? {};

  return (
    <View style={s.card}>
      <BlurFill />
      <Text
        style={s.label}
      >
        {display.charAt(0) + display.slice(1).toLowerCase()}
      </Text>
      <Text style={s.date}>
        {formatDate(occurrenceDateTime)}
      </Text>
    </View>
  );
}
