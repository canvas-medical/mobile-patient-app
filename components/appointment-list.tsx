import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { g } from '@styles';
import { AppointmentCard } from './appointment-card';

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
  scrollSection: {
    gap: g.size(16),
  },
});

const appointments = [
  {
    id: 1,
    datetimeStart: '2023-11-20T10:00:00',
    datetimeEnd: '2023-11-20T11:00:00',
    practitioner: 'Dr. Smith',
    location: '1545 Eaton St',
    appointmentType: {
      coding: {
        display: 'Not Telemedicine'
      }
    }
  },
  {
    id: 2,
    datetimeStart: '2023-11-21T11:30:00',
    datetimeEnd: '2023-11-21T12:30:00',
    practitioner: 'Dr. Johnson',
    location: 'Clinic B',
    appointmentType: {
      coding: {
        display: 'Telemedicine'
      }
    }
  },
  {
    id: 3,
    datetimeStart: '2023-11-22T14:15:00',
    datetimeEnd: '2023-11-22T15:15:00',
    practitioner: 'Dr. Davis',
    location: 'Clinic C',
    appointmentType: {
      coding: {
        display: 'Telemedicine'
      }
    }
  },
  {
    id: 4,
    datetimeStart: '2023-11-23T16:45:00',
    datetimeEnd: '2023-11-23T17:45:00',
    practitioner: 'Dr. Wilson',
    location: 'Clinic D',
    appointmentType: {
      coding: {
        display: 'Telemedicine'
      }
    }
  },
  {
    id: 5,
    datetimeStart: '2023-11-24T09:30:00',
    datetimeEnd: '2023-11-24T10:30:00',
    practitioner: 'Dr. Anderson',
    location: 'Clinic E',
    appointmentType: {
      coding: {
        display: 'Telemedicine'
      }
    }
  }
];

export function AppointmentList() {
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.datetimeStart) > new Date());
  const pastAppointments = appointments.filter((appointment) => new Date(appointment.datetimeStart) <= new Date());
  return (
    <ScrollView contentContainerStyle={s.contentContainer}>
      {upcomingAppointments.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Upcoming
          </Text>
          {upcomingAppointments.map((appt) => <AppointmentCard appt={appt} />)}
        </View>
      )}
      {pastAppointments.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Past
          </Text>
          {pastAppointments.map((appt) => <AppointmentCard appt={appt} />)}
        </View>
      )}
    </ScrollView>
  );
}
