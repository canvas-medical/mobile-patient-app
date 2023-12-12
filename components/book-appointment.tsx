import { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { g } from '@styles';

const s = StyleSheet.create({
  animatedContainer: {
    overflow: 'hidden',
    borderBottomColor: g.white,
    borderBottomWidth: 1,
    marginHorizontal: g.size(16),
  },
  selectButton: {
    ...g.shadow,
    backgroundColor: g.white,
    paddingHorizontal: g.size(12),
    paddingVertical: g.size(2),
    borderRadius: g.size(32),
    alignSelf: 'flex-end',
    marginBottom: g.size(8),
  },
  selectButtonLabel: {
    ...g.titleXSmall,
    color: g.primaryBlue,
  },
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
  showButtonLabelX: {
    transform: [{ rotate: '45deg' }],
  },
});

export function BookAppointment() {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const heightValue = useRef(new Animated.Value(0)).current;

  return (
    <>
      <TouchableOpacity
        style={s.showButton}
        onPress={() => {
          Animated.timing(heightValue, {
            toValue: showDatePicker ? 0 : g.size(275),
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start();
          setShowDatePicker(!showDatePicker);
        }}
      >
        <Text style={s.showButtonLabel}>
          {showDatePicker ? 'Close' : 'Book'}
          &nbsp;
        </Text>
        <Text style={[s.showButtonLabel, showDatePicker && s.showButtonLabelX]}>
          +
        </Text>
      </TouchableOpacity>
      <Animated.View style={[s.animatedContainer, { maxHeight: heightValue }]}>
        <DateTimePicker
          mode="date"
          display="spinner"
          value={selectedDate}
          minimumDate={new Date()}
          onChange={(_, date: Date) => setSelectedDate(date)}
          textColor={g.white}
        />
        <TouchableOpacity
          style={s.selectButton}
          onPress={() => router.push({
            pathname: 'book-appointment',
            params: { bookingDate: selectedDate.toISOString().slice(0, 10) }
          })}
        >
          <Text style={s.selectButtonLabel}>
            Select
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
