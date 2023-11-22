import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { g } from '@styles';
import { MedicationCard } from './medication-card';

const s = StyleSheet.create({
  contentContainer: {
    gap: g.size(24),
    paddingTop: g.size(12),
    paddingBottom: g.size(120),
    paddingHorizontal: g.size(16),
  },
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  scrollSection: {
    gap: g.size(16),
  },
});

const medications = [
  {
    id: 1,
    datetimeStart: '2023-11-20T10:00:00',
    datetimeEnd: '2023-11-20T11:00:00',
    medication: 'Tylenol PM Extra Strength 25 mg-500 mg tablet',
    dosage: '1-2 tablets once daily at bedtime as needed for restless legs'
  },
  {
    id: 2,
    datetimeStart: '2023-11-21T11:30:00',
    datetimeEnd: '2023-11-21T12:30:00',
    medication: 'Advil 200 mg tablet',
    dosage: '1 tablet every 4-6 hours as needed for pain relief'
  },
  {
    id: 3,
    datetimeStart: '2023-11-22T14:15:00',
    datetimeEnd: '2023-11-22T15:15:00',
    medication: 'Zyrtec 10 mg tablet',
    dosage: '1 tablet once daily for allergy relief'
  },
  {
    id: 4,
    datetimeStart: '2023-11-23T16:45:00',
    datetimeEnd: '2023-11-23T17:45:00',
    medication: 'Lipitor 20 mg tablet',
    dosage: '1 tablet once daily for cholesterol management'
  },
  {
    id: 5,
    datetimeStart: '2023-11-24T09:30:00',
    datetimeEnd: '2023-11-24T10:30:00',
    medication: 'Prozac 20 mg capsule',
    dosage: '1 capsule once daily for depression treatment'
  },
];

export function MedicationList() {
  const activeMedications = medications.filter((medication) => new Date(medication.datetimeEnd) > new Date());
  const expiredMedications = medications.filter((medication) => new Date(medication.datetimeEnd) <= new Date());
  return (
    <ScrollView contentContainerStyle={s.contentContainer}>
      {activeMedications.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Active
          </Text>
          {activeMedications.map((med) => <MedicationCard med={med} />)}
        </View>
      )}
      {expiredMedications.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Expired
          </Text>
          {expiredMedications.map((med) => <MedicationCard med={med} />)}
        </View>
      )}
    </ScrollView>
  );
}
