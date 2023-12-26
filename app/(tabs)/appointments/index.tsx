/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppointments } from '@services';
import { Appointment } from '@interfaces';
import { AppointmentCard, StackListView, ZeroState } from '@components';
import doctor from '@assets/images/doctor.svg';
import { g } from '@styles';

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
});

export default function Appointments() {
  const tabBarHeight = useBottomTabBarHeight();
  const { data, isLoading, refetch } = useAppointments();
  const [refreshing, setRefreshing] = useState(false);
  const upcomingAppointments = data?.filter((appointment: Appointment) => new Date(appointment.start) > new Date());
  const pastAppointments = data?.filter((appointment: Appointment) => new Date(appointment.start) <= new Date());
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <StackListView
      title="Appointments"
      icon={<MaterialCommunityIcons name="calendar-heart" size={g.size(36)} color={g.white} />}
      isLoading={false}
      refetch={() => null}
      scrollEnabled={false}
    >
      <View style={StyleSheet.absoluteFill}>
        {isLoading
          ? <ActivityIndicator size="large" color={g.white} style={s.loading} />
          : (
            <>
              {data.length ? (
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
                      colors={[g.white]}
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
      </View>
    </StackListView>
  );
}
