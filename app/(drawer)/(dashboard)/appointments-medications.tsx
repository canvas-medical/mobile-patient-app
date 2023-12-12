import { useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useMedications, useAppointments } from '@services';
import { LabeledToggle, AppointmentList, MedicationList, BookAppointment } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  scrollContentContainer: {
    minHeight: '100%',
    padding: g.size(16),
    paddingBottom: g.size(120),
    gap: g.size(24),
  },
});

export default function AppointmentsAndMedications() {
  const { data: medications, isLoading: loadingMedications, refetch: refetchMedications } = useMedications();
  const { data: appointments, isLoading: loadingAppointments, refetch: refetchAppointments } = useAppointments();
  const [toggled, setToggled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (toggled) await refetchMedications();
    else await refetchAppointments();
    setRefreshing(false);
  };

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
        <View style={s.contentContainer}>
          {!toggled && <BookAppointment />}
          <ScrollView
            contentContainerStyle={s.scrollContentContainer}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={g.white}
                colors={[g.white]}
              />
            )}
          >
            {toggled ? <MedicationList medications={medications} /> : <AppointmentList appointments={appointments} />}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
