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
    flex: 1,
    padding: g.size(16),
    paddingBottom: g.size(120),
    gap: g.size(24),
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
});

export default function AppointmentsAndMedications() {
  const { data: medications, isLoading: fetchingMedications } = useMedications();
  const { data: appointments, isLoading: fetchingAppointments } = useAppointments();
  const [toggled, setToggled] = useState(false);

  return (
    <View style={s.container}>
      <LabeledToggle
        toggled={toggled}
        setToggled={setToggled}
        optionOne="Appointments"
        optionTwo="Prescriptions"
      />
      {(toggled && fetchingMedications) || (!toggled && fetchingAppointments) ? (
        <ActivityIndicator size="large" color={g.white} style={s.loading} />
      ) : (
        <ScrollView
          style={s.contentContainer}
          contentContainerStyle={{ paddingBottom: g.size(120) }}
        >
          {toggled ? <MedicationList medications={medications} /> : <AppointmentList appointments={appointments} />}
        </ScrollView>
      )}
    </View>
  );
}
