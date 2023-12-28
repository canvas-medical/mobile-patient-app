import { StyleSheet, Text } from 'react-native';
import { formatDate } from '@utils';
import { Immunization } from '@interfaces';
import { ExplainButton, BlurFill } from '@components';
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
    color: g.white,
    alignSelf: 'flex-end',
  },
  label: {
    ...g.labelMedium,
    color: g.white,
    maxWidth: '92%',
  },
});

export function ImmunizationCard({ immunization }: { immunization: Immunization }) {
  const {
    vaccineCode: { coding: [{ display = '' } = {}] = [] } = {},
    occurrenceDateTime = ''
  } = immunization ?? {};

  return (
    <ExplainButton
      style={s.card}
      id={immunization.id}
      resourceType={immunization.resourceType}
      codes={immunization.vaccineCode.coding}
      description={immunization.vaccineCode.coding[0].display}
    >
      <BlurFill />
      <Text
        style={s.label}
      >
        {display.charAt(0) + display.slice(1).toLowerCase()}
      </Text>
      <Text style={s.date}>
        {formatDate(occurrenceDateTime)}
      </Text>
    </ExplainButton>
  );
}
