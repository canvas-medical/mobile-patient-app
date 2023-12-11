import DateTimePicker from '@react-native-community/datetimepicker';
import { g } from '@styles';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const s = StyleSheet.create({
  showButton: {
    ...g.shadow,
    position: 'absolute',
    top: g.size(14),
    right: g.size(16),
    backgroundColor: g.white,
    paddingHorizontal: g.size(12),
    paddingVertical: g.size(2),
    borderRadius: g.size(32),
    minWidth: g.size(80),
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  showButtonLabel: {
    ...g.titleXSmall,
    color: g.primaryBlue,
  },
  selectButton: {
    ...g.shadow,
    backgroundColor: g.white,
    paddingHorizontal: g.size(12),
    paddingVertical: g.size(2),
    borderRadius: g.size(32),
    alignSelf: 'flex-end',
  },
  selectButtonLabel: {
    ...g.titleXSmall,
    color: g.primaryBlue,
  },
  showButtonLabelX: {
    transform: [{ rotate: '45deg' }],
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: g.red,
    borderStyle: 'solid',
  }
});

export function BookAppointment() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const setDate = (event: any, date: any) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <>
      <TouchableOpacity
        style={s.showButton}
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <Text style={s.showButtonLabel}>
          {showDatePicker ? 'Close' : 'Book'}
          &nbsp;
        </Text>
        <Text style={[s.showButtonLabel, showDatePicker && s.showButtonLabelX]}>
          +
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <View style={s.pickerContainer}>
          <DateTimePicker
            mode="date"
            display="spinner"
            value={selectedDate}
            minimumDate={new Date()}
            onChange={setDate}
          // onChange={(e: any) => {
          // onChange={(e: any) => {
          //   if (e.type === 'set') {
          //     onChange(new Date(e.nativeEvent.timestamp).toISOString().slice(0, 10));
          //     if (Platform.OS === 'android') setShowDatePicker(false);
          //   }
          // }}
          />
          <TouchableOpacity
            style={s.selectButton}
            onPress={() => router.push('book-time-temporary')}
          >
            <Text style={s.selectButtonLabel}>
              Select
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}