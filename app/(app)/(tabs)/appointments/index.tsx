import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Text,
  Platform,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FlashList } from '@shopify/flash-list';
import { AppointmentCard, Header, FlashListSeparator, ZeroState } from '@components';
import { Appointment } from '@interfaces';
import { schedulePushNotification, useAppointments } from '@services';
import { formatTime } from '@utils';
import doctor from '@assets/images/doctor.svg';
import { g } from '@styles';

const s = StyleSheet.create({
  bookButton: {
    ...g.buttonShadow,
    width: g.size(72),
    height: g.size(72),
    borderRadius: g.size(36),
    backgroundColor: g.secondaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: g.size(12),
    marginBottom: Platform.OS === 'ios' ? g.size(12) : g.size(32),
    opacity: 0.9,
  },
  container: {
    flex: 1,
    backgroundColor: g.neutral100,
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  maskedView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: g.size(16),
    paddingTop: g.size(28),
  },
  sectionLabel: {
    ...g.titleXSmall,
    color: g.neutral700,
    marginTop: g.size(4),
    marginBottom: -g.size(8),
  },
  title: {
    ...g.titleLarge,
    color: g.neutral700,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(16),
    paddingLeft: g.size(20),
    marginTop: g.size(20),
  }
});

export default function Appointments() {
  const tabBarHeight = useBottomTabBarHeight();
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAppointments();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const upcomingAppointments = data?.pages.flat().filter((appointment: Appointment) => new Date(appointment.start) > new Date()).reverse() ?? [];
  const pastAppointments = data?.pages.flat().filter((appointment: Appointment) => new Date(appointment.start) <= new Date()) ?? [];
  const appointments: (string | Appointment)[] = [
    'Upcoming',
    ...upcomingAppointments,
    'Past',
    ...pastAppointments,
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const scheduleNotifications = async () => {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      upcomingAppointments.filter((appt: Appointment) => appt.status !== 'cancelled').map(async (upcomingAppointment: Appointment) => {
        const {
          id = '',
          start = '',
          reasonCode = [{ text: '' }],
        } = upcomingAppointment ?? {};
        // Checking if notifications are already scheduled to reduce API calls
        if (scheduled.find((notification) => notification.content.data?.id === id)) return;
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
    <View style={s.container}>
      <Header hideBackButton />
      <View style={s.titleContainer}>
        <MaterialCommunityIcons name="calendar-heart" size={g.size(36)} color={g.neutral700} />
        <Text style={s.title}>
          Appointments
        </Text>
      </View>
      {isLoading
        ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
        : (
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
            {appointments?.length ? (
              <FlashList
                data={appointments}
                contentContainerStyle={{
                  ...s.scrollContent,
                  paddingBottom: tabBarHeight + g.size(120),
                }}
                getItemType={(item) => {
                  if (typeof item === 'string') return 'sectionHeader';
                  return 'row';
                }}
                renderItem={({ item }) => {
                  if (typeof item === 'string') return <Text style={s.sectionLabel}>{item}</Text>;
                  return (
                    <AppointmentCard
                      key={item.id}
                      appointment={item}
                    />
                  );
                }}
                refreshControl={(
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={g.primaryBlue}
                    colors={[g.primaryBlue]}
                    progressViewOffset={g.size(40)}
                  />
                )}
                ItemSeparatorComponent={() => FlashListSeparator()}
                estimatedItemSize={g.size(137)}
                onEndReached={() => {
                  if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.1}
                ListFooterComponent={isFetchingNextPage && (
                  <ActivityIndicator
                    size="large"
                    color={g.primaryBlue}
                    style={{ marginTop: g.size(40) }}
                  />
                )}
              />
            ) : (
              <ZeroState
                image={doctor}
                imageAspectRatio={1.4}
                text="You have no upcoming appointments. Press the plus icon below to book one!"
              />
            )}
          </MaskedView>
        )}
      <TouchableOpacity
        style={[
          s.bookButton,
          { bottom: tabBarHeight + g.size(16) },
        ]}
        onPress={() => router.push('appointments/book-appointment')}
      >
        <MaterialCommunityIcons name="calendar-plus" size={g.size(36)} color={g.white} />
      </TouchableOpacity>
    </View>
  );
}
