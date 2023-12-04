import {
  StyleSheet, View, Text, TouchableOpacity, Platform, Linking
} from 'react-native';
import { Appointment } from '@interfaces';
import { BlurView } from 'expo-blur';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { formatTime } from '@utils';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardBlur: {
    position: 'relative',
  },
  cardContent: {
    padding: g.size(20),
    paddingTop: g.size(16),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(12),
  },
  dataDivider: {
    height: g.size(1),
    width: '100%',
    backgroundColor: g.white,
    marginVertical: g.size(16),
    opacity: 0.75,
    borderRadius: g.size(1),
  },
  dateTime: {
    ...g.bodyMedium,
    color: g.white,
    flex: 1,
  },
  leftBorder: {
    position: 'absolute',
    left: 0,
    top: g.size(6),
    bottom: g.size(6),
    width: g.size(4),
    borderRadius: g.size(4),
    opacity: 0.75,
    backgroundColor: g.white,
  },
  practitioner: {
    ...g.bodyXLarge,
    color: g.white,
  },
  practitionerData: {
    flex: 1,
  },
  practitionerLocation: {
    ...g.bodyMedium,
    color: g.white,
  }
});

export function AppointmentCard({ appt }: { appt: Appointment }) {
  const {
    id,
    datetimeStart,
    datetimeEnd,
    practitioner,
    location,
    appointmentType,
    contained: { address },
  } = appt;
  const display = appointmentType?.coding?.display;
  console.log('display', display);
  console.log('appt', appt);

  const formattedDate = new Date(datetimeStart).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).split(',').join('');
  const needsMapLink = display !== 'Telemedicine' && display !== 'Telehealth';

  const url = needsMapLink && Platform.select({
    ios: `https://maps.apple.com?address=${address}`,
    android: `https://www.google.com/maps/search/?api=1&query=${address}`,
  });

  return (
    <View
      key={id}
      style={s.card}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={s.cardBlur}
      >
        <View style={s.leftBorder} />
        <View style={s.cardContent}>
          <View style={s.cardRow}>
            <Feather name="clock" size={24} color={g.white} />
            <Text
              style={s.dateTime}
              numberOfLines={1}
            >
              {formattedDate}
              &nbsp;
              •
              &nbsp;
              {formatTime(datetimeStart, false)}
              {' '}
              -
              {' '}
              {formatTime(datetimeEnd, true)}
            </Text>
          </View>
          <View style={s.dataDivider} />
          <View style={s.cardRow}>
            <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />
            <View style={s.practitionerData}>
              <Text
                style={s.practitioner}
                numberOfLines={1}
              >
                {practitioner}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(url || address)}
              >
                <Text
                  style={s.practitionerLocation}
                  numberOfLines={1}
                >
                  {location}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
