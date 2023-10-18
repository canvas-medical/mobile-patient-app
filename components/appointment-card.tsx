import { StyleSheet, View, Text } from 'react-native';
import { Appointment } from '@interfaces';
import { BlurView } from 'expo-blur';
import { Feather, FontAwesome } from '@expo/vector-icons';
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
  physician: {
    ...g.bodyLarge,
    color: g.white,
  },
  physicianData: {
    flex: 1,
  },
  physicianTypeAndLocation: {
    ...g.bodySmall,
    color: g.white,
  }
});

export function AppointmentCard({ appt }: { appt: Appointment }) {
  const {
    date,
    time,
    physician,
    physician_type: physicianType,
    location,
  } = appt;

  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).split(',').join('');

  return (
    <View style={s.card}>
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
              {time}
            </Text>
          </View>
          <View style={s.dataDivider} />
          <View style={s.cardRow}>
            <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />
            <View style={s.physicianData}>
              <Text
                style={s.physician}
                numberOfLines={1}
              >
                {physician}
              </Text>
              <Text
                style={s.physicianTypeAndLocation}
                numberOfLines={1}
              >
                {physicianType}
              </Text>
              <Text
                style={s.physicianTypeAndLocation}
                numberOfLines={1}
              >
                {location}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
