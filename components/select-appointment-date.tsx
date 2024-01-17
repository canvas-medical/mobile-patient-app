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
import { Button } from '@components';
import { formatDate } from '@utils';
import { g } from '@styles';

interface AppointmentDateProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
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
    backgroundColor: g.neutral150,
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    borderRadius: g.size(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalToggleButtonLabel: {
    ...g.bodyLarge,
    color: g.black,
  },
  modalToggleButtonPlaceholder: {
    color: g.neutral400,
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
  const [provisionalDate, setProvisionalDate] = useState<Date>();
  const futureDateSelected = selectedDate > new Date();

  function onChangeDate(date: Date) {
    setSelectedDate(date);
  }

  function closeDatePicker() {
    setSelectedDate(provisionalDate);
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
          timeZoneName="Etc/Universal"
          value={selectedDate}
          minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
          themeVariant="dark"
          maximumDate={null}
          onChange={(_e: DateTimePickerEvent, date: Date) => {
            setShowDatePicker(false);
            onChangeDate(date);
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
              timeZoneName="Etc/Universal"
              display="inline"
              value={selectedDate}
              minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
              themeVariant="light"
              maximumDate={null}
              onChange={(_e: DateTimePickerEvent, date: Date) => setProvisionalDate(date)}
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
        <Text
          style={[
            s.modalToggleButtonLabel,
            !futureDateSelected && s.modalToggleButtonPlaceholder,
          ]}
        >
          {futureDateSelected ? formatDate(selectedDate.toISOString()) : 'Select a date'}
        </Text>
        <MaterialCommunityIcons name="calendar-blank" size={g.size(20)} color={g.black} />
      </TouchableOpacity>
    </View>
  );
}
