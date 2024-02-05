import { StyleSheet, View, Text } from 'react-native';
import { capitalizeFirstCharacter, formatDate } from '@utils';
import { Medication } from '@interfaces';
import { CardContainer } from '@components/card-container';
import { g } from '@styles';

const s = StyleSheet.create({
  date: {
    ...g.bodySmall,
    color: g.neutral600,
  },
  dosage: {
    ...g.bodyMedium,
    color: g.neutral700,
    flex: 1,
  },
  dosageAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: g.ms(12),
  },
  medication: {
    ...g.labelMedium,
    color: g.neutral900,
    maxWidth: '92%',
  },
});

export function MedicationCard({ med }: { med: Medication }) {
  const {
    medicationCodeableConcept: { coding: [{ display: medication = '' }] = [{}] } = {},
    dosage = [{ text: '' }],
    dateAsserted = ''
  } = med ?? {};

  return (
    <CardContainer>
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
    </CardContainer>
  );
}
