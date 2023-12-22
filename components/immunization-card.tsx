import { StyleSheet, View, Text } from 'react-native';
import { Immunization } from '@interfaces';
import { ExplainButton, BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    padding: g.size(16),
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  dataContainer: {
    flex: 1,
    gap: g.size(4),
  },
  date: {
    ...g.bodySmall,
    color: g.white,
  },
  label: {
    ...g.labelSmall,
    color: g.white,
    maxWidth: '95%',
  },
});

export function ImmunizationCard({ immunization }: { immunization: Immunization }) {
  const {
    vaccineCode: { coding: [{ display }] },
    occurrenceDateTime,
  } = immunization;

  return (
    <ExplainButton
      style={s.card}
      id={immunization.id}
      resourceType={immunization.resourceType}
      codes={immunization.vaccineCode.coding}
      description={immunization.vaccineCode.coding[0].display}
    >
      <BlurFill />
      <View style={s.dataContainer}>
        <Text
          style={s.label}
        >
          {display}
        </Text>
        <Text style={s.date}>
          Last immunized:
          &nbsp;
          {new Date(occurrenceDateTime).toLocaleDateString()}
        </Text>
      </View>
    </ExplainButton>
  );
}
