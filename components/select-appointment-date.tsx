// AppointmentDate.tsx
import { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurFill, Button } from '@components';
import { timeZoneOffset, formatDate } from '@utils';
import { g } from '@styles';

interface AppointmentDateProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  modal: {
    paddingHorizontal: g.size(8),
    paddingBottom: g.size(12),
    backgroundColor: g.white,
    borderRadius: g.size(16),
    gap: g.size(4),
  },
  modalToggleButton: {
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    borderRadius: g.size(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalToggleButtonLabel: {
    ...g.bodyLarge,
    color: g.black,
  },
  modalToggleButtonPlaceholder: {
    color: g.newNeutral400,
  },
  sectionContainer: {
    gap: g.size(12),
  },
  sectionHeader: {
    ...g.labelMedium,
    color: g.black,
    marginLeft: g.size(4),
  },
});

export function SelectAppointmentDate({ selectedDate, setSelectedDate }: AppointmentDateProps) {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [provisionalDate, setProvisionalDate] = useState<number>(0);
  const futureDateSelected = timeZoneOffset(selectedDate) > new Date();

  function onChangeDate(date: number) {
    if (timeZoneOffset(selectedDate).getDate() === new Date().getDate()) {
      setSelectedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    }
    setSelectedDate(new Date(date).toISOString().slice(0, 10));
  }

  function closeDatePicker() {
    if (provisionalDate === 0) {
      setSelectedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    } else setSelectedDate(new Date(provisionalDate).toISOString().slice(0, 10));
    setShowDatePicker(false);
  }

  return (
    <View style={s.sectionContainer}>
      <Text style={s.sectionHeader}>
        Date
      </Text>
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          mode="date"
          value={timeZoneOffset(selectedDate)}
          minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
          themeVariant="dark"
          maximumDate={null}
          onChange={(e: DateTimePickerEvent) => {
            setShowDatePicker(false);
            onChangeDate(e.nativeEvent.timestamp);
          }}
        />
      )}
      {Platform.OS === 'ios' && (
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={showDatePicker}
          swipeDirection="right"
          onSwipeComplete={() => closeDatePicker()}
          customBackdrop={(
            <TouchableWithoutFeedback onPress={() => closeDatePicker()}>
              <View style={s.backdrop} />
            </TouchableWithoutFeedback>
          )}
        >
          <View style={s.modal}>
            <DateTimePicker
              mode="date"
              display="inline"
              value={timeZoneOffset(selectedDate)}
              minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
              themeVariant="light"
              maximumDate={null}
              onChange={(e: DateTimePickerEvent) => setProvisionalDate(e.nativeEvent.timestamp)}
            />
            <Button
              label="Select Date"
              theme="primary"
              onPress={() => closeDatePicker()}
            />
          </View>
        </Modal>
      )}
      <TouchableOpacity
        style={s.modalToggleButton}
        onPress={() => setShowDatePicker(true)}
      >
        <BlurFill />
        <Text
          style={[
            s.modalToggleButtonLabel,
            !futureDateSelected && s.modalToggleButtonPlaceholder,
          ]}
        >
          {futureDateSelected ? formatDate(selectedDate, 'numeric') : 'Select a date'}
        </Text>
        <MaterialCommunityIcons name="calendar-blank" size={g.size(20)} color={g.black} />
      </TouchableOpacity>
    </View>
  );
}
