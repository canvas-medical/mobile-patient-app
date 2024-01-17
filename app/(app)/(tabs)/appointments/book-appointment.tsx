import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaskedView from '@react-native-masked-view/masked-view';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useCreateAppointment, useSchedule, useSlot } from '@services';
import { formatDate, formatTime } from '@utils';
import { Schedule, Slot } from '@interfaces';
import { Button, SelectAppointmentDate, SelectAppointmentType, SelectReasonForVisit } from '@components';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  bookButton: {
    position: 'absolute',
    left: g.size(16),
    right: g.size(16),
  },
  buttonSelected: {
    backgroundColor: g.secondaryBlue,
    opacity: 1,
  },
  container: {
    flex: 1,
    backgroundColor: g.white,
  },
  error: {
    ...g.bodyMedium,
    color: g.neutral800,
    textAlign: 'center',
    marginBottom: g.size(176),
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.66,
    aspectRatio: 1,
  },
  header: {
    paddingHorizontal: g.size(36),
    paddingVertical: g.size(24),
    backgroundColor: g.tertiaryBlue,
    overflow: 'hidden',
    borderBottomLeftRadius: g.size(28),
    borderBottomRightRadius: g.size(28),
  },
  labelSelected: {
    color: g.white,
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
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: g.neutral150,
    flexShrink: 1,
    gap: g.size(8),
    paddingHorizontal: g.size(16),
    paddingVertical: g.size(8),
    borderRadius: g.size(32),
    opacity: 0.8,
  },
  scheduleButtonLabel: {
    ...g.bodyLarge,
    color: g.neutral900,
    flexShrink: 1,
  },
  scrollContent: {
    flexGrow: 1,
    gap: g.size(24),
    paddingHorizontal: g.size(16),
    paddingTop: Platform.OS === 'ios' ? g.size(28) : g.size(36),
  },
  sectionContainer: {
    gap: g.size(12),
  },
  sectionHeader: {
    ...g.labelMedium,
    color: g.neutral800,
    marginLeft: g.size(4),
  },
  slotButton: {
    backgroundColor: g.neutral150,
    paddingHorizontal: g.size(12),
    paddingVertical: g.size(4),
    borderRadius: g.size(32),
  },
  slotButtonLabel: {
    ...g.labelMedium,
    color: g.neutral900,
  },
  slotButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: g.size(16),
    paddingBottom: g.size(120),
  },
  title: {
    textAlign: 'center',
    ...g.titleLarge,
    color: g.white,
    marginTop: g.size(20),
  },
});

const baseReasonsForDoctorVisit = [
  { reasonLabel: 'Routine check-up', appointmentDuration: 80 },
  { reasonLabel: 'Symptoms evaluation', appointmentDuration: 40 },
  { reasonLabel: 'Follow-up appointment', appointmentDuration: 20 },
  { reasonLabel: 'Medication refill', appointmentDuration: 20 },
  { reasonLabel: 'Health concern', appointmentDuration: 20 },
  { reasonLabel: 'Specialist referral', appointmentDuration: 40 },
  { reasonLabel: 'Preventive care', appointmentDuration: 40 },
  { reasonLabel: 'Other', appointmentDuration: 60 },
];

const inPersonExtraReasons = [
  { reasonLabel: 'Vaccination', appointmentDuration: 20 },
  { reasonLabel: 'Lab test', appointmentDuration: 40 },
  { reasonLabel: 'Physical examination', appointmentDuration: 80 },
];

const inPersonReasonsForDoctorVisit = [{ reasonLabel: 'Select One', appointmentDuration: 0 }, ...inPersonExtraReasons, ...baseReasonsForDoctorVisit];
const telehealthReasonsForDoctorVisit = [{ reasonLabel: 'Select One', appointmentDuration: 0 }, ...baseReasonsForDoctorVisit];

const reasonsForDoctorVisitMap = {
  'Office Visit': inPersonReasonsForDoctorVisit,
  'Home Visit': inPersonReasonsForDoctorVisit,
  'Video Call': telehealthReasonsForDoctorVisit,
  'Phone Call': telehealthReasonsForDoctorVisit,
};

export default function BookAppointment() {
  const tabBarHeight = useBottomTabBarHeight();
  const scrollViewRef = useRef<ScrollView>();
  const [appointmentReason, setAppointmentReason] = useState<string>('');
  const [appointmentDuration, setAppointmentDuration] = useState<number>(0);
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [appointmentTypeCode, setAppointmentTypeCode] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>({} as Schedule);
  const [selectedSlot, setSelectedSlot] = useState<Slot>({} as Slot);
  const { data: scheduleData, isLoading: isLoadingSchedules } = useSchedule();
  const { data: slotData, isLoading: isLoadingSlots } = useSlot(selectedDate.toISOString().slice(0, 10), selectedSchedule.id, appointmentDuration);
  const { mutate: onCreateAppointment, isPending, isSuccess } = useCreateAppointment();
  const bookDisabled = !Object.keys(selectedSlot).length;
  const futureDateSelected = selectedDate > new Date();

  useEffect(() => {
    if (!!Object.keys(selectedSchedule)?.length && slotData?.length === 0) {
      scrollViewRef?.current?.scrollToEnd();
    }
  }, [slotData]);

  function buttonLabel() {
    switch (true) {
      case !appointmentReason: return 'Select a reason';
      case !futureDateSelected: return 'Select a date';
      case !Object.keys(selectedSchedule).length: return 'Select a practitioner';
      case slotData?.length === 0: return 'Select a different date';
      case !Object.keys(selectedSlot).length: return 'Select a time';
      case isPending: return 'Booking...';
      case isSuccess: return 'Booked!';
      default: return 'Book Appointment';
    }
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Image
          style={s.graphic}
          source={graphic}
          contentFit="fill"
        />
        <TouchableOpacity onPress={() => router.back()}>
          <Feather
            name="arrow-left"
            size={g.size(36)}
            color={g.white}
          />
        </TouchableOpacity>
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
            locations={[0, 0.06]}
          />
        )}
      >
        <ScrollView
          contentContainerStyle={s.scrollContent}
          scrollEnabled={futureDateSelected}
          ref={scrollViewRef}
        >
          <SelectAppointmentType
            appointmentType={appointmentType}
            setAppointmentType={setAppointmentType}
            setAppointmentTypeCode={setAppointmentTypeCode}
          />
          {!!appointmentType && reasonsForDoctorVisitMap[appointmentType] && (
            <SelectReasonForVisit
              reasonsForDoctorVisit={reasonsForDoctorVisitMap[appointmentType]}
              appointmentReason={appointmentReason}
              setAppointmentReason={setAppointmentReason}
              setAppointmentDuration={setAppointmentDuration}
            />
          )}
          {!!appointmentReason && (
            <SelectAppointmentDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
          {futureDateSelected && (
            <>
              {isLoadingSchedules
                ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
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
                            <FontAwesome5
                              name="user-md"
                              size={g.size(28)}
                              color={selected ? g.white : g.neutral800}
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
          {!!Object.keys(selectedSchedule).length && isLoadingSlots
            ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
            : (
              <>
                {slotData?.length > 0 && (
                  <View style={s.sectionContainer}>
                    <Text style={s.sectionHeader}>
                      Appointments available for
                      {' '}
                      {formatDate(selectedDate.toISOString())}
                    </Text>
                    <View style={s.slotButtonsContainer}>
                      {slotData?.map((slot: Slot) => {
                        const selected = selectedSlot === slot;
                        return (
                          <TouchableOpacity
                            key={`${slot.start}-${slot.end}`}
                            style={[s.slotButton, selected && s.buttonSelected]}
                            onPress={() => setSelectedSlot(selected ? {} as Slot : slot)}
                          >
                            <Text style={[s.slotButtonLabel, selected && s.labelSelected]}>
                              {formatTime(slot.start)}
                              {' '}
                              -
                              {' '}
                              {formatTime(slot.end, true, true)}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
                {!!Object.keys(selectedSchedule).length && slotData?.length === 0 && (
                  <Text style={s.error}>There are no available appointments for the selected date. Please choose a different day.</Text>
                )}
              </>
            )}
        </ScrollView>
        <Button
          label={buttonLabel()}
          theme="primary"
          style={[
            s.bookButton,
            { bottom: Platform.OS === 'ios' ? g.size(32) : tabBarHeight + g.size(12) }
          ]}
          onPress={() => onCreateAppointment({
            startTime: selectedSlot?.start,
            endTime: selectedSlot?.end,
            practitionerID: selectedSchedule?.actor[0]?.reference,
            reason: appointmentReason,
            appointmentType,
            appointmentTypeCode,
          })}
          disabled={bookDisabled}
        />
      </MaskedView>
    </View>
  );
}
