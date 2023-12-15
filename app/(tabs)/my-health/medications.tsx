import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useMedications } from '@services';
import { Medication } from '@interfaces';
import { MedicationCard, StackListView } from '@components';
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

export default function LabResults() {
  const { data, isLoading, refetch } = useMedications();
  const activeMedications = data.filter((med) => med.status === 'active');
  const expiredMedications = data.filter((med) => med.status === 'stopped');

  return (
    <StackListView
      title="Medications"
      icon={<Entypo name="lab-flask" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {activeMedications.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Active
          </Text>
          {activeMedications.map((med: Medication) => <MedicationCard key={med.id} med={med} />)}
        </View>
      )}
      {expiredMedications.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Inactive
          </Text>
          {expiredMedications.map((med: Medication) => <MedicationCard key={med.id} med={med} />)}
        </View>
      )}
    </StackListView>
  );
}
