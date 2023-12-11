import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useMedications, useAppointments } from '@services';
import { LabeledToggle, AppointmentList, MedicationList } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: g.size(16),
    paddingBottom: g.size(120),
    gap: g.size(24),
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  scrollContainer: {
    flex: 1,
  },
});

export default function AppointmentsAndMedications() {
  const { data: medications, isLoading: loadingMedications } = useMedications();
  const { data: appointments, isLoading: loadingAppointments } = useAppointments();
  const [toggled, setToggled] = useState(false);

  return (
    <View style={s.container}>
      <LabeledToggle
        toggled={toggled}
        setToggled={setToggled}
        optionOne="Appointments"
        optionTwo="Prescriptions"
      />
      {(toggled && loadingMedications) || (!toggled && loadingAppointments) ? (
        <ActivityIndicator size="large" color={g.white} style={s.loading} />
      ) : (
        <ScrollView
          style={s.scrollContainer}
          contentContainerStyle={s.contentContainer}
        >
          {toggled ? <MedicationList medications={medications} /> : <AppointmentList appointments={appointments} />}
        </ScrollView>
      )}
    </View>
  );
}
