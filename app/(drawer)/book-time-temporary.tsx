import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSchedule, useSlot, useCareTeams, useAppointments } from '@services';
import { StackListView } from '@components';
import { g } from '@styles';
import { QueryObserverResult } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const s = StyleSheet.create({
  // label: {
  //   ...g.titleXSmall,
  //   color: g.white,
  //   marginLeft: g.size(4),
  // },
  // scrollSection: {
  //   gap: g.size(16),
  // },
});

export default function BookTimeTemporary() { // TODO: Rename
  const params = useLocalSearchParams();
  const { bookingDate } = params;
  const [scheduleID, setScheduleID] = useState<string>('');
  const { data: scheduleData } = useSchedule();
  const { data: slotData } = useSlot(bookingDate as string, scheduleID); // wont work as is
  // const { data: careTeamsData } = useCareTeams();
  // const { data: appointmentsData } = useAppointments();

  // console.log('SCHEDULE: ', scheduleData);
  console.log('SLOT: ', slotData);
  // console.log('CARE TEAMS: ', careTeamsData);
  // console.log('APPOINTMENTS: ', appointmentsData);

  console.log('=====: ', typeof bookingDate);

  console.log('COMPONENT STATE ID: ', scheduleID);

  return (
    <StackListView
      title="Book Time"
      icon={<FontAwesome5 name="heart-broken" size={g.size(36)} color={g.white} />}
      isLoading={false} // todo: replace
      refetch={() => Promise.resolve({} as QueryObserverResult<any, Error>)} // TODO: replace
    >
      {scheduleData?.map((schedule) => (
        <TouchableOpacity
          key={schedule.id}
          onPress={() => setScheduleID(schedule.id)}
        >
          <View>
            {/* <FontAwesome5 name="user-md" size={g.size(24)} color={g.white} /> */}
            <Text>
              {schedule.comment}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </StackListView>
  );
}
