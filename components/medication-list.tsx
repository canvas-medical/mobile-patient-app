import { StyleSheet, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useRecords } from '@services';
import { MedicationCard } from '@components'; // TODO - Revisit this to prevent circular dependency and excessive imports
import { g } from '@styles';

const s = StyleSheet.create({
  contentContainer: {
    gap: g.size(24),
    padding: g.size(16),
    paddingBottom: g.size(120),
  },
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  scrollSection: {
    gap: g.size(16),
  },
});

export function MedicationList() {
  const { data: medications, isFetching } = useRecords('MedicationStatement');
  if (isFetching) return <ActivityIndicator size="large" color={g.white} style={s.loading} />;
  const meds = medications.entry.map((med) => med.resource);
  const activeMedications = meds.filter((med) => med.status === 'active');
  const expiredMedications = meds.filter((med) => med.status === 'stopped');

  return (
    <ScrollView contentContainerStyle={s.contentContainer}>
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
    </ScrollView>
  );
}
