import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurFill } from '@components';
import { Appointment } from '@interfaces';
import { formatTime } from '@utils';
import { useClinicLocation } from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
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
  navLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: g.size(4),
    gap: g.size(4),
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
    textDecorationLine: 'underline',
  },
});

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const {
    start,
    end,
    appointmentType,
    reasonCode,
    contained,
  } = appointment;
  const { data: clinicAddress } = useClinicLocation();
  const formattedDate = new Date(start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: '2-digit' });
  const isOfficeVisit = appointmentType.coding[0].display === 'Office Visit';

  const startTime = new Date(start).getTime();
  const currentTime = new Date().getTime();
  const isWithin30MinBeforeOr15MinAfterApptTime = currentTime >= startTime - 30 * 60 * 1000 && currentTime <= startTime + 15 * 60 * 1000;
  const displayNavLink = ((!isOfficeVisit && !!contained[0]?.address)
    || (isOfficeVisit && !!clinicAddress))
    && (currentTime <= startTime + 15 * 60 * 1000);

  const url = isOfficeVisit ? Platform.select({
    ios: `https://maps.apple.com?address=${clinicAddress}`,
    android: `https://www.google.com/maps/search/?api=1&query=${clinicAddress}`,
  }) : contained[0]?.address;

  return (
    <View style={s.card}>
      <BlurFill />
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
            {formatTime(start, false)}
            {' '}
            -
            {' '}
            {formatTime(end, true)}
          </Text>
        </View>
        <View style={s.dataDivider} />
        <View style={s.cardRow}>
          <FontAwesome5 name="user-md" size={g.size(36)} color={g.white} />
          <View style={s.practitionerData}>
            <Text
              style={s.practitioner}
              numberOfLines={1}
            >
              {reasonCode[0].text.charAt(0).toUpperCase() + reasonCode[0].text.slice(1)}
            </Text>
            {displayNavLink && (
              <TouchableOpacity
                style={s.navLink}
                onPress={() => {
                  if (isWithin30MinBeforeOr15MinAfterApptTime || isOfficeVisit) Linking.openURL(url);
                  else {
                    Alert.alert(
                      "You're early!",
                      "You'll be able to join your telehealth call within 30 minutes of your appointment time.",
                      [{ text: 'OK' }],
                      { cancelable: false }
                    );
                  }
                }}
              >
                {isOfficeVisit
                  ? <Ionicons name="navigate" size={g.size(18)} color={g.white} />
                  : <MaterialIcons name="video-call" size={g.size(20)} color={g.white} />
                }
                <Text
                  style={s.practitionerLocation}
                  numberOfLines={1}
                >
                  {isOfficeVisit ? 'Open in maps' : 'Join video call'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
