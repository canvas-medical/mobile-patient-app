import { StyleSheet, Text } from 'react-native';
import { formatDate } from '@utils';
import { Immunization } from '@interfaces';
import { g } from '@styles';
import { CardContainer } from './card-container';

const s = StyleSheet.create({
  date: {
    ...g.bodySmall,
    color: g.neutral600,
    alignSelf: 'flex-end',
  },
  label: {
    ...g.labelMedium,
    color: g.neutral900,
    maxWidth: '92%',
  },
});

export function ImmunizationCard({ immunization }: { immunization: Immunization }) {
  const {
    vaccineCode: { coding: [{ display = '' } = {}] = [] } = {},
    occurrenceDateTime = ''
  } = immunization ?? {};

  return (
    <CardContainer>
      <Text
        style={s.label}
      >
        {display.charAt(0) + display.slice(1).toLowerCase()}
      </Text>
      <Text style={s.date}>
        {formatDate(occurrenceDateTime)}
      </Text>
    </CardContainer>
  );
}
