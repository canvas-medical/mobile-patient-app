/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { schedulePushNotification, useAppointments } from '@services';
import { Appointment } from '@interfaces';
import { AppointmentCard, Header, Screen, ZeroState } from '@components';
import doctor from '@assets/images/doctor.svg';
import { g } from '@styles';
import { formatTime } from '@utils';

const s = StyleSheet.create({
  bookButton: {
    ...g.shadow,
    width: g.size(72),
    height: g.size(72),
    borderRadius: g.size(36),
    backgroundColor: g.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: g.size(12),
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  maskedView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: g.size(16),
    paddingHorizontal: g.size(16),
    paddingTop: g.size(40),
  },
  scrollSection: {
    gap: g.size(16),
  },
  sectionLabel: {
    ...g.titleXSmall,
    color: g.white,
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(16),
    paddingLeft: g.size(20),
    marginTop: g.size(16),
  }
});

export default function Appointments() {
  const tabBarHeight = useBottomTabBarHeight();
  const { data, isLoading, refetch } = useAppointments();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const upcomingAppointments = data?.filter((appointment: Appointment) => new Date(appointment.start) > new Date());
  const pastAppointments = data?.filter((appointment: Appointment) => new Date(appointment.start) <= new Date());
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const scheduleNotifications = async () => {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      console.log(scheduled);
      upcomingAppointments.map(async (upcomingAppointment: Appointment) => {
        const {
          id = '',
          start = '',
          reasonCode = [{ text: '' }],
        } = upcomingAppointment ?? {};
        // Checking if notifications are already scheduled to reduce API calls
        if (scheduled.find((notification) => notification.content.data.id === id)) return;
        await schedulePushNotification({
          appointmentStartTime: start,
          formattedTime: formatTime(start, true),
          appointmentDescription: reasonCode[0]?.text,
          appointmentID: id,
          checkedIfScheduled: true,
        });
      });
    };
    scheduleNotifications();
  }, [upcomingAppointments]);

  return (
    <Screen>
      <Header hideBackButton />
      <View style={s.titleContainer}>
        <MaterialCommunityIcons name="calendar-heart" size={g.size(36)} color={g.white} />
        <Text style={s.title}>
          Appointments
        </Text>
      </View>
      {isLoading
        ? <ActivityIndicator size="large" color={g.white} style={s.loading} />
        : (
          <>
            {data.length ? (
              <MaskedView
                style={s.maskedView}
                maskElement={(
                  <LinearGradient
                    style={s.maskedView}
                    colors={[g.transparent, g.white]}
                    locations={[0.0175, 0.065]}
                  />
                )}
              >
                <ScrollView
                  contentContainerStyle={[
                    s.scrollContent,
                    { paddingBottom: tabBarHeight + g.size(104) },
                  ]}
                  refreshControl={(
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      tintColor={g.white}
                      colors={[g.primaryBlue]}
                      progressViewOffset={g.size(40)}
                    />
                  )}
                >
                  {upcomingAppointments.length > 0 && (
                    <View style={s.scrollSection}>
                      <Text style={s.sectionLabel}>
                        Upcoming
                      </Text>
                      {upcomingAppointments.map((appt) => (
                        <AppointmentCard
                          key={appt.id}
                          appointment={appt}
                        />
                      ))}
                    </View>
                  )}
                  {pastAppointments.length > 0 && (
                    <View style={s.scrollSection}>
                      <Text style={s.sectionLabel}>
                        Past
                      </Text>
                      {pastAppointments.map((appt) => (
                        <AppointmentCard
                          key={appt.id}
                          appointment={appt}
                        />
                      ))}
                    </View>
                  )}
                </ScrollView>
              </MaskedView>
            ) : (
              <ZeroState
                image={doctor}
                imageAspectRatio={1.4}
                text="You have no upcoming appointments. Press the plus icon below to book one!"
              />
            )}
          </>
        )}
      <TouchableOpacity
        style={[
          s.bookButton,
          { bottom: tabBarHeight + g.size(16) },
        ]}
        onPress={() => router.push('appointments/book-appointment')}
      >
        <MaterialCommunityIcons name="calendar-plus" size={g.size(36)} color={g.primaryBlue} />
      </TouchableOpacity>
    </Screen>
  );
}
