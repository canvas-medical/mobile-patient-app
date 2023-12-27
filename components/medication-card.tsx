import { StyleSheet, View, Text } from 'react-native';
import { capitalizeFirstCharacter, formatDate } from '@utils';
import { Medication } from '@interfaces';
import { BlurFill, ExplainButton } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(8),
  },
  date: {
    ...g.bodySmall,
    color: g.white,
  },
  dosage: {
    ...g.bodyMedium,
    color: g.white,
    flex: 1,
  },
  dosageAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: g.size(12),
  },
  medication: {
    ...g.labelMedium,
    color: g.white,
    maxWidth: '92%',
  },
});

export function MedicationCard({ med }: { med: Medication }) {
  const {
    medicationCodeableConcept: {
      coding: [{ display: medication }],
    },
    dosage,
    dateAsserted,
  } = med;

  return (
    <ExplainButton
      style={s.card}
      id={med.id}
      resourceType={med.resourceType}
      codes={med.medicationCodeableConcept.coding}
      description={med.medicationCodeableConcept.coding[0].display}
    >
      <BlurFill />
      <Text style={s.medication}>
        {capitalizeFirstCharacter(medication)}
      </Text>
      <View style={s.dosageAndDateContainer}>
        <Text style={s.dosage}>
          {capitalizeFirstCharacter(dosage[0].text)}
        </Text>
        <Text style={s.date}>
          {formatDate(dateAsserted)}
        </Text>
      </View>
    </ExplainButton>
  );
}

export function MedicationSkeleton() {
  return (
    <View style={s.card}>
      <BlurFill />
    </View>
  );
}
