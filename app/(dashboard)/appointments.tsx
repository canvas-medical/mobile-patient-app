import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Screen, Search, LabeledToggle, AppointmentCard } from '@components';
import { g } from '@styles';

import { userData, medicalAppointmentData } from '../../dummyData';

const s = StyleSheet.create({
  greeting: {
    ...g.bodyMedium,
    color: g.white,
  },
  scroll: {
    paddingHorizontal: g.size(16),
  },
  scrollContent: {
    gap: g.size(12),
    paddingTop: g.size(12),
    paddingBottom: g.size(120),
  },
  title: {
    ...g.titleLarge,
  },
  topContainer: {
    paddingHorizontal: g.size(16),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: g.size(72),
    marginBottom: g.size(16),
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(12),
  },
  userGreetingContainer: {
    flex: 1,
  },
  userName: {
    ...g.titleSmall,
    color: g.white,
  },
});

export default function Appointments() {
  const [toggled, setToggled] = useState(true);

  function filterByDate() {
    const now = new Date();
    return medicalAppointmentData.filter((appt) => {
      const apptDate = new Date(appt.date);
      return toggled ? apptDate > now : apptDate < now;
    });
  }

  return (
    <Screen>
      <View style={s.topContainer}>
        <View style={s.topRow}>
          <View style={s.userContainer}>
            <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />
            <View style={s.userGreetingContainer}>
              <Text style={s.greeting}>
                Hello
              </Text>
              <Text
                style={s.userName}
                numberOfLines={1}
              >
                {userData.name}
              </Text>
            </View>
          </View>
          <Search />
        </View>
        <Text style={s.title}>
          Appointments
        </Text>
        <LabeledToggle
          toggled={toggled}
          setToggled={setToggled}
          optionOne="Past"
          optionTwo="Upcoming"
        />
      </View>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
      >
        {filterByDate().map((appt) => <AppointmentCard key={appt.id} appt={appt} />)}
      </ScrollView>
    </Screen>
  );
}
