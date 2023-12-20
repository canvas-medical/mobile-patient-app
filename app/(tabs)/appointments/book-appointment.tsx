/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCreateAppointment, useSchedule, useSlot } from '@services';
import { formatTime } from '@utils';
import { Schedule, Slot } from '@interfaces';
import { Button, Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  bookButton: {
    position: 'absolute',
    bottom: g.size(32),
    left: g.size(16),
    right: g.size(16),
  },
  buttonSelected: {
    backgroundColor: g.white,
  },
  container: {
    paddingTop: g.size(16),
  },
  labelSelected: {
    color: g.primaryBlue,
    opacity: 1,
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  maskedView: {
    flex: 1,
  },
  practitionerButtonsContainer: {
    gap: g.size(16),
    alignItems: 'flex-start',
  },
  practitionerIcon: {
    opacity: 0.8,
  },
  practitionerIconSelected: {
    opacity: 1,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: g.size(8),
    paddingHorizontal: g.size(16),
    paddingVertical: g.size(8),
    overflow: 'hidden',
    borderRadius: g.size(32),
  },
  scheduleButtonLabel: {
    ...g.bodyLarge,
    color: g.white,
    flexShrink: 1,
    opacity: 0.8,
  },
  scrollContent: {
    flexGrow: 1,
    gap: g.size(16),
    paddingHorizontal: g.size(16),
    paddingTop: g.size(40),
  },
  sectionContainer: {
    gap: g.size(12),
  },
  sectionHeader: {
    ...g.labelMedium,
    color: g.white,
    marginLeft: g.size(4),
  },
  slotButton: {
    paddingHorizontal: g.size(12),
    paddingVertical: g.size(4),
    borderRadius: g.size(32),
    overflow: 'hidden',
  },
  slotButtonLabel: {
    ...g.labelMedium,
    color: g.white,
    opacity: 0.8,
  },
  slotButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: g.size(16),
    paddingBottom: g.size(96),
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(16),
    paddingLeft: g.size(20),
    paddingTop: g.size(20),
  },
});

export default function BookAppointment() {
  const bookingDate = new Date().toISOString().slice(0, 10); // TODO: Replace with date from date picker
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>({} as Schedule);
  const [selectedSlot, setSelectedSlot] = useState<Slot>({} as Slot);
  const { data: scheduleData, isLoading: isLoadingSchedules } = useSchedule();
  const { data: slotData, isLoading: isLoadingSlots } = useSlot(bookingDate as string, selectedSchedule.id);
  const { mutate: onCreateAppointment, isPending, isSuccess } = useCreateAppointment();
  const dateValue = new Date(new Date(bookingDate as string).getTime() + (new Date(bookingDate as string).getTimezoneOffset() * 60000));
  const dateLabel = dateValue.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const futureSlotTimes = useMemo(() => {
    if (bookingDate === new Date().toISOString().slice(0, 10)) {
      return slotData?.filter((slot: Slot) => {
        const slotTime = new Date(slot.start).toLocaleTimeString('en-US');
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 2);
        const twoHoursFromNow = currentTime.toLocaleTimeString('en-US');
        return slotTime > twoHoursFromNow;
      });
    }
    return null;
  }, [bookingDate, slotData]);

  function buttonLabel() {
    if (isPending) return 'Booking...';
    if (isSuccess) return 'Booked!';
    return 'Book Appointment';
  }

  return (
    <Screen style={s.container}>
      <View style={s.titleContainer}>
        <MaterialCommunityIcons name="calendar-plus" size={g.size(36)} color={g.white} />
        <Text style={s.title}>
          Book Appointment
        </Text>
      </View>
      {isLoadingSchedules ? <ActivityIndicator size="large" color={g.white} style={s.loading} /> : (
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
          <ScrollView contentContainerStyle={s.scrollContent}>
            <View style={s.sectionContainer}>
              <Text style={s.sectionHeader}>
                Select a Practitioner
              </Text>
              <View style={s.practitionerButtonsContainer}>
                {scheduleData?.map((schedule: Schedule) => {
                  const selected = selectedSchedule.id === schedule.id;
                  return (
                    <TouchableOpacity
                      key={schedule.id}
                      style={[s.scheduleButton, selected && s.buttonSelected]}
                      onPress={() => {
                        setSelectedSlot({} as Slot);
                        setSelectedSchedule(schedule);
                      }}
                    >
                      <BlurView
                        intensity={40}
                        tint="light"
                        style={StyleSheet.absoluteFill}
                      />
                      <FontAwesome5
                        name="user-md"
                        size={g.size(28)}
                        color={selected ? g.primaryBlue : g.white}
                        style={selected ? s.practitionerIconSelected : s.practitionerIcon}
                      />
                      <Text
                        style={[s.scheduleButtonLabel, selected && s.labelSelected]}
                        numberOfLines={1}
                      >
                        {schedule.comment.replace('Schedule for ', '')}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {!!selectedSchedule && isLoadingSlots ? <ActivityIndicator size="large" color={g.white} style={s.loading} /> : (
              <>
                {futureSlotTimes?.length > 0 && (
                  <View style={s.sectionContainer}>
                    <Text style={s.sectionHeader}>
                      Appointments available for
                      {' '}
                      {dateLabel}
                    </Text>
                    <View style={s.slotButtonsContainer}>
                      {futureSlotTimes.map((slot: Slot) => {
                        const selected = selectedSlot === slot;
                        return (
                          <TouchableOpacity
                            key={`${slot.start}-${slot.end}`}
                            style={[s.slotButton, selected && s.buttonSelected]}
                            onPress={() => setSelectedSlot(selected ? {} as Slot : slot)}
                          >
                            <BlurView
                              intensity={40}
                              tint="light"
                              style={StyleSheet.absoluteFill}
                            />
                            <Text style={[s.slotButtonLabel, selected && s.labelSelected]}>
                              {formatTime(slot.start, false)}
                              {' '}
                              -
                              {' '}
                              {formatTime(slot.end, true)}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
              </>
            )}
            {!!selectedSchedule && futureSlotTimes?.length > 0 && (
              <Button
                label={buttonLabel()}
                theme="secondary"
                style={s.bookButton}
                onPress={() => onCreateAppointment({
                  startTime: selectedSlot?.start,
                  endTime: selectedSlot?.end,
                  practitionerID: selectedSchedule?.actor[0]?.reference,
                })}
                disabled={!Object.keys(selectedSlot).length}
              />
            )}
          </ScrollView>
        </MaskedView>
      )}
    </Screen>
  );
}
