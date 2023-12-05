import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { g } from '@styles';
import { Appointment } from '@interfaces';
import { useEffect } from 'react';
import { sendPushNotification } from '@services/push_notifications';
import { formatTime } from '@utils';
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

const appointments: Appointment[] = [
  {
    id: '1',
    start: '2023-11-20T10:00:00',
    end: '2023-11-20T11:00:00',
    appointmentType: {
      coding: [{
        display: 'Not Telemedicine',
      }]
    },
    contained: [{
      address: '1644 Platte St'
    }],
    reasonCode: [{
      coding: [{
        display: 'Follow-up'
      }]
    }]
  },
  {
    id: '2',
    start: '2023-11-21T11:30:00',
    end: '2023-11-21T12:30:00',
    appointmentType: {
      coding: [{
        display: 'Telemedicine'
      }]
    },
    contained: [{
      address: 'https://zoom.us/j/91537108094?pwd=RlNwUmd2MGNjMmdmZEQ2VTluWFJaUT09'
    }],
    reasonCode: [{
      coding: [{
        display: 'Initial Visit'
      }]
    }]
  },
  {
    id: '3',
    start: '2023-11-22T14:15:00',
    end: '2023-11-22T15:15:00',
    appointmentType: {
      coding: [{
        display: 'Telemedicine'
      }]
    },
    contained: [{
      address: 'https://meet.google.com/dic-wcwq-csh?ijlm=1701723603749&hs=185'
    }],
    reasonCode: [{
      coding: [{
        display: 'Initial Visit'
      }]
    }]

  },
  {
    id: '4',
    start: '2023-12-23T16:45:00',
    end: '2023-12-23T17:45:00',
    appointmentType: {
      coding: [{
        display: 'Telemedicine'
      }]
    },
    contained: [{
      address: 'broken link'
    }],
    reasonCode: [{
      coding: [{
        display: 'Initial Visit'
      }]
    }]
  },
  {
    id: '5',
    start: '2023-12-24T09:30:00',
    end: '2023-12-24T10:30:00',
    appointmentType: {
      coding: [{
        display: 'Telemedicine'
      }]
    },
    contained: [{
      address: 'broken link'
    }],
    reasonCode: [{
      coding: [{
        display: 'Initial Visit'
      }]
    }]
  }
];

export function AppointmentList() {
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.start) > new Date());
  const pastAppointments = appointments.filter((appointment) => new Date(appointment.start) <= new Date());

  // TODO: improve placement of this loop once we are requesting data from the API
  useEffect(() => {
    const scheduleNotifications = async () => {
      upcomingAppointments.map(async (
        { id, start, reasonCode: [{ coding: [{ display: reasonDisplay }] }] }
      ) => sendPushNotification(start, formatTime(start, true), reasonDisplay, id));
    };
    scheduleNotifications();
  }, [upcomingAppointments]);
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
