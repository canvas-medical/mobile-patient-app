import { StyleSheet, Text, View } from 'react-native';
import { Medication } from '@interfaces';
import { MedicationCard } from '@components'; // TODO - Revisit this to prevent circular dependency and excessive imports
import { g } from '@styles';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  scrollSection: {
    gap: g.size(16),
  },
});

export function MedicationList({ medications }: { medications: Medication[] }) {
  const activeMedications = medications.filter((med) => med.status === 'active');
  const expiredMedications = medications.filter((med) => med.status === 'stopped');

  return (
    <>
      {activeMedications.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Active
          </Text>
          {activeMedications.map((med) => <MedicationCard key={med.id} med={med} />)}
        </View>
      )}
      {expiredMedications.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Inactive
          </Text>
          {expiredMedications.map((med) => <MedicationCard key={med.id} med={med} />)}
        </View>
      )}
    </>
  );
}
