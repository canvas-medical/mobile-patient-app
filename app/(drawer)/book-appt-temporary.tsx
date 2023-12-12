import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCreateAppointment } from '@services';
import { Button, StackListView } from '@components';
import { g } from '@styles';

export default function BookApptTemporary() { // TODO: Rename
  const params = useLocalSearchParams();
  const { mutate: onCreateAppointment } = useCreateAppointment();

  const schedule = JSON.parse(params.schedule as string); // TODO: Rework these to not be stringified
  const slot = JSON.parse(params.slot as string); // TODO: Rework these to not be stringified

  const data = {
    startTime: slot.start,
    endTime: slot.end,
    practitionerID: schedule.actor[0].reference,
  };

  return (
    <StackListView
      title="Book Time"
      icon={<MaterialCommunityIcons name="calendar-heart" size={g.size(36)} color={g.white} />}
      isLoading={false} // TODO: update
      refetch={null} // TODO: update
    >
      <Button
        label="Book Appointment"
        onPress={() => onCreateAppointment(data)} // TODO: update
        theme="secondary"
      />
    </StackListView>
  );
}
