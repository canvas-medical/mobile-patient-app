import { StyleSheet, Text, View } from 'react-native';
import { g } from '@styles';
import { AppointmentCard } from '@components/appointment-card'; // TODO - Revisit this to prevent circular dependency and excessive imports
import { Appointment } from '@interfaces';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  scrollSection: {
    gap: g.size(16),
  },
});

export function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.start) > new Date());
  const pastAppointments = appointments.filter((appointment) => new Date(appointment.start) <= new Date());

  return (
    <>
      {upcomingAppointments.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Upcoming
          </Text>
          {upcomingAppointments.map((appt) => <AppointmentCard key={appt.id} appt={appt} />)}
        </View>
      )}
      {pastAppointments.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Past
          </Text>
          {pastAppointments.map((appt) => <AppointmentCard key={appt.id} appt={appt} />)}
        </View>
      )}
    </>
  );
}
