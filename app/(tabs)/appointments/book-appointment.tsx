/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Overlay } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCreateAppointment, useSchedule, useSlot } from '@services';
import { formatTime } from '@utils';
import { Schedule, Slot } from '@interfaces';
import { Button, Screen, BlurFill } from '@components';
import { g } from '@styles';
import { Picker } from '@react-native-picker/picker';

const s = StyleSheet.create({
  bookButton: {
    position: 'absolute',
    bottom: g.size(32),
    left: g.size(16),
    right: g.size(16),
    opacity: 1,
    borderWidth: 1,
    borderColor: g.white,
  },
  bookButtonDisabled: {
    backgroundColor: g.neutral100,
    opacity: 0.9,
  },
  buttonSelected: {
    backgroundColor: g.white,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  pickerButton: {
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    borderRadius: g.size(50),
    overflow: 'hidden',
  },
  pickerButtonLabel: {
    ...g.bodyLarge,
    color: g.white,
  },
  pickerButtonPlaceholder: {
    color: g.neutral200
  },
  pickerOverlay: {
    width: '85%',
    borderRadius: g.size(16),
    backgroundColor: g.white,
    paddingVertical: 0
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
    gap: g.size(24),
    paddingHorizontal: g.size(16),
    paddingTop: g.size(28),
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
    paddingBottom: g.size(120),
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(16),
    paddingLeft: g.size(20),
    paddingTop: g.size(36),
    marginBottom: g.size(8),
  },
});

const reasonsForDoctorVisit = [
  { reasonLabel: 'Select One', appointmentDuration: 0 },
  { reasonLabel: 'Routine check-up', appointmentDuration: 80 },
  { reasonLabel: 'Symptoms evaluation', appointmentDuration: 40 },
  { reasonLabel: 'Follow-up appointment', appointmentDuration: 20 },
  { reasonLabel: 'Vaccination', appointmentDuration: 20 },
  { reasonLabel: 'Medication refill', appointmentDuration: 20 },
  { reasonLabel: 'Health concern', appointmentDuration: 20 },
  { reasonLabel: 'Specialist referral', appointmentDuration: 40 },
  { reasonLabel: 'Lab test', appointmentDuration: 40 },
  { reasonLabel: 'Physical examination', appointmentDuration: 80 },
  { reasonLabel: 'Preventive care', appointmentDuration: 40 },
  { reasonLabel: 'Other', appointmentDuration: 60 },
];

export default function BookAppointment() {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(Platform.OS === 'ios');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [showReasonPicker, setShowReasonPicker] = useState<boolean>(false);
  const [appointmentReason, setAppointmentReason] = useState<string>('');
  const [appointmentDuration, setAppointmentDuration] = useState<number>(0);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>({} as Schedule);
  const [selectedSlot, setSelectedSlot] = useState<Slot>({} as Slot);
  const { data: scheduleData, isLoading: isLoadingSchedules } = useSchedule();
  const { data: slotData, isLoading: isLoadingSlots } = useSlot(selectedDate as string, selectedSchedule.id, appointmentDuration);
  const { mutate: onCreateAppointment, isPending, isSuccess } = useCreateAppointment();
  const bookDisabled = !Object.keys(selectedSlot).length;
  const dateValue = new Date(new Date(selectedDate).getTime() + (new Date(selectedDate).getTimezoneOffset() * 60000));
  const futureDateSelected = dateValue.getDate() > new Date().getDate();
  const dateLabel = dateValue.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  function onChangeDate(event: DateTimePickerEvent) {
    if (event.type === 'dismissed' && dateValue.getDate() === new Date().getDate()) {
      setSelectedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    }
    if (event.type === 'set') {
      setSelectedDate(new Date(event.nativeEvent.timestamp).toISOString().slice(0, 10));
      if (Platform.OS === 'android') setShowDatePicker(false);
    }
  }

  function buttonLabel() {
    if (isPending) return 'Booking...';
    if (isSuccess) return 'Booked!';
    return 'Book Appointment';
  }

  return (
    <Screen>
      <View style={s.titleContainer}>
        <MaterialCommunityIcons name="calendar-plus" size={g.size(36)} color={g.white} />
        <Text style={s.title}>
          Book Appointment
        </Text>
      </View>
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
          <View style={s.dateSection}>
            <Text style={s.sectionHeader}>
              Select a Date
            </Text>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={dateValue}
                minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                themeVariant="dark"
                maximumDate={null}
                onChange={(e: DateTimePickerEvent) => onChangeDate(e)}
              />
            )}
          </View>
          {futureDateSelected && (
            <View style={s.sectionContainer}>
              <Text style={s.sectionHeader}>
                Reason for Visit
              </Text>
              <>
                <TouchableOpacity
                  style={s.pickerButton}
                  onPress={() => setShowReasonPicker(true)}
                >
                  <BlurFill />
                  <Text
                    style={[
                      s.pickerButtonLabel,
                      !appointmentReason && s.pickerButtonPlaceholder,
                    ]}
                  >
                    {appointmentReason || 'Select'}
                  </Text>
                </TouchableOpacity>
                {showReasonPicker && (
                  <Overlay
                    isVisible={showReasonPicker}
                    onBackdropPress={() => setShowReasonPicker(false)}
                    overlayStyle={s.pickerOverlay}
                  >
                    <Picker
                      selectedValue={appointmentReason}
                      onValueChange={(itemValue) => {
                        if (reasonsForDoctorVisit.find((item) => item.reasonLabel === itemValue)?.appointmentDuration) {
                          setAppointmentReason(itemValue);
                          setAppointmentDuration(reasonsForDoctorVisit.find((item) => item.reasonLabel === itemValue)?.appointmentDuration);
                        }
                      }}
                    >
                      {reasonsForDoctorVisit.map((item: { reasonLabel: string }) => (
                        <Picker.Item
                          key={item.reasonLabel}
                          label={item.reasonLabel}
                          value={item.reasonLabel}
                        />
                      ))}
                    </Picker>
                  </Overlay>
                )}
              </>
            </View>
          )}
          {!!appointmentReason && (
            <>
              {isLoadingSchedules
                ? <ActivityIndicator size="large" color={g.white} style={s.loading} />
                : (
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
                            <BlurFill />
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
                )}
            </>
          )}
          {!!selectedSchedule && isLoadingSlots
            ? <ActivityIndicator size="large" color={g.white} style={s.loading} />
            : (
              <>
                {slotData?.length > 0 && (
                  <View style={s.sectionContainer}>
                    <Text style={s.sectionHeader}>
                      Appointments available for
                      {' '}
                      {dateLabel}
                    </Text>
                    <View style={s.slotButtonsContainer}>
                      {slotData.map((slot: Slot) => {
                        const selected = selectedSlot === slot;
                        return (
                          <TouchableOpacity
                            key={`${slot.start}-${slot.end}`}
                            style={[s.slotButton, selected && s.buttonSelected]}
                            onPress={() => setSelectedSlot(selected ? {} as Slot : slot)}
                          >
                            <BlurFill />
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
        </ScrollView>
        {!!slotData?.length && (
          <Button
            label={buttonLabel()}
            theme={bookDisabled ? 'tertiary' : 'secondary'}
            style={[
              s.bookButton,
              bookDisabled && s.bookButtonDisabled,
            ]}
            onPress={() => onCreateAppointment({
              startTime: selectedSlot?.start,
              endTime: selectedSlot?.end,
              practitionerID: selectedSchedule?.actor[0]?.reference,
            })}
            disabled={bookDisabled}
          />
        )}
      </MaskedView>
    </Screen>
  );
}
