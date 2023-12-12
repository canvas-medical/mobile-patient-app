import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Appointment } from '@interfaces';
import { schedulePushNotification } from '@services';
import { formatTime } from '@utils';
import { AppointmentCard } from '@components/appointment-card'; // TODO - Revisit this to prevent circular dependency and excessive imports
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

export function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.start) > new Date());
  const pastAppointments = appointments.filter((appointment) => new Date(appointment.start) <= new Date());

  // TODO: improve placement of this loop once we are requesting data from the API
  useEffect(() => {
    const scheduleNotifications = async () => {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      upcomingAppointments.map(async ({ id, start, reasonCode: [{ text: reasonDisplay }] }) => {
        // Checking if notifications are already scheduled to reduce API calls
        if (scheduled.find((notification) => notification.content.data.id === id)) return;
        await schedulePushNotification({
          appointmentStartTime: start,
          formattedTime: formatTime(start, true),
          appointmentDescription: reasonDisplay,
          appointmentID: id,
          checkedIfScheduled: true,
        });
      });
    };
    scheduleNotifications();
  }, [upcomingAppointments]);
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
