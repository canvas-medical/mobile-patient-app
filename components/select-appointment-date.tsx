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
import { Button } from '@components/button';
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
    paddingHorizontal: g.ws(8),
    paddingBottom: g.hs(12),
    backgroundColor: g.white,
    width: '85%',
    maxWidth: 375,
    borderRadius: g.ms(16),
    gap: g.hs(4),
    alignSelf: 'center',
  },
  modalToggleButton: {
    backgroundColor: g.neutral150,
    paddingVertical: g.hs(8),
    paddingHorizontal: g.ms(16),
    borderRadius: g.ms(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalToggleButtonLabel: {
    ...g.bodyLarge,
    color: g.neutral900,
  },
  modalToggleButtonPlaceholder: {
    color: g.neutral400,
  },
  sectionContainer: {
    gap: g.hs(12),
  },
  sectionHeader: {
    ...g.labelMedium,
    color: g.neutral700,
    marginLeft: g.ms(4),
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
    if (provisionalDate) setSelectedDate(provisionalDate);
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
          onSwipeComplete={() => setShowDatePicker(false)}
          customBackdrop={(
            <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
              <View style={s.backdrop} />
            </TouchableWithoutFeedback>
          )}
        >
          <View style={s.modal}>
            <DateTimePicker
              mode="date"
              display="inline"
              value={selectedDate}
              minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
              themeVariant="light"
              maximumDate={null}
              onChange={(_e: DateTimePickerEvent, date: Date) => setProvisionalDate(date)}
            />
            <Button
              label="Select"
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
        <MaterialCommunityIcons name="calendar-blank" size={g.ms(20)} color={g.neutral600} />
      </TouchableOpacity>
    </View>
  );
}
