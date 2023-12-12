import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSchedule, useSlot, useCreateAppointment } from '@services';
import { formatTime } from '@utils';
import { Button, StackListView } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
});

export default function BookApptTemporary() { // TODO: Rename
  const params = useLocalSearchParams();
  const { mutate: onCreateAppointment, isPending } = useCreateAppointment();

  console.log('SCHEDULE 222: ', JSON.parse(params.schedule as string));
  console.log('SLOT 222: ', JSON.parse(params.slot as string));

  const schedule = JSON.parse(params.schedule as string);
  const slot = JSON.parse(params.slot as string);

  const data = {
    locationID: schedule.id.split('.')[1],
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
