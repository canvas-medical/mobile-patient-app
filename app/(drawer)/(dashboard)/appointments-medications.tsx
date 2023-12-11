import { useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
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
        <ScrollView
          contentContainerStyle={s.contentContainer}
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
      )}
    </View>
  );
}
