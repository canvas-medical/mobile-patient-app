import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSchedule, useSlot, useCareTeams, useAppointments } from '@services';
import { StackListView } from '@components';
import { g } from '@styles';

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
  const { data: scheduleData } = useSchedule();
  const { data: slotData } = useSlot(); // wont work as is
  const { data: careTeamsData } = useCareTeams();
  const { data: appointmentsData } = useAppointments();

  console.log('SCHEDULE: ', scheduleData);
  console.log('SLOT: ', slotData);
  console.log('CARE TEAMS: ', careTeamsData);
  console.log('APPOINTMENTS: ', appointmentsData);

  return (
    <StackListView
      title="Book Time"
      icon={<FontAwesome5 name="heart-broken" size={g.size(36)} color={g.white} />}
      isFetching={false} // todo: replace
    >
      <Text>REMOVE ME</Text>
    </StackListView>
  );
}
