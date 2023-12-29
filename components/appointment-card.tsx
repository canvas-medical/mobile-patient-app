import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useClinicLocation, useCancelAppointment } from '@services';
import { capitalizeFirstCharacter, formatDate, formatTime } from '@utils';
import { Appointment } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  appointmentLocation: {
    ...g.bodyMedium,
    color: g.white,
    textDecorationLine: 'underline',
  },
  cancelledCopy: {
    ...g.bodyMedium,
    color: g.severityRed,
  },
  cancelledCopyContainer: {
    minHeight: g.size(28),
    padding: g.size(4),
    justifyContent: 'center',
  },
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardCancelled: {
    opacity: 0.5,
  },
  cardContent: {
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
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
    minHeight: g.size(28),
  },
  reason: {
    ...g.bodyXLarge,
    color: g.white,
  },
  reasonData: {
    flex: 1,
  },
});

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const {
    id,
    start = '',
    end = '',
    appointmentType = { coding: [{ display: '' }] },
    reasonCode = [{ text: '' }],
    contained = [{ address: '' }],
    status = '',
    participant = [{ actor: { type: '', reference: '' } }],
  } = appointment ?? {};
  const { data: clinicAddress } = useClinicLocation();
  const { mutate: onCancelAppointment, isPending } = useCancelAppointment();
  const isOfficeVisit = appointmentType?.coding[0]?.display === 'Office Visit';
  const cancelled = status === 'cancelled';
  const practitionerID = participant?.find((p) => p.actor?.type === 'Practitioner')?.actor?.reference;

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

  const cancelAppointment = () => {
    Alert.alert(
      'Would you like to cancel this appointment?',
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Are you sure?',
              '',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: "Yes, I'm sure",
                  style: 'destructive',
                  onPress: () => {
                    onCancelAppointment({
                      id,
                      start,
                      end,
                      practitionerID,
                    });
                  },
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <View
      style={[s.card, cancelled && s.cardCancelled]}

    >
      <BlurFill />
      <View style={s.leftBorder} />
      <View style={s.cardContent}>
        <View style={s.cardRow}>
          <Feather name="clock" size={g.size(24)} color={g.white} />
          <Text
            style={s.dateTime}
            numberOfLines={1}
          >
            {formatDate(start)}
            &nbsp;
            •
            &nbsp;
            {formatTime(start, false)}
            {' '}
            -
            {' '}
            {formatTime(end, true)}
          </Text>
          {isPending && <ActivityIndicator color={g.white} />}
          {!cancelled
            && (
            <TouchableOpacity
              disabled={cancelled || isPending}
              onPress={cancelAppointment}
            >
              <MaterialIcons name="delete-forever" size={g.size(24)} color={g.white} />
            </TouchableOpacity>
            )
          }
        </View>
        <View style={s.dataDivider} />
        <View style={s.cardRow}>
          <FontAwesome5 name="user-md" size={g.size(36)} color={g.white} />
          <View style={s.reasonData}>
            <Text
              style={s.reason}
              numberOfLines={1}
            >
              {capitalizeFirstCharacter(reasonCode[0].text)}
            </Text>
            {displayNavLink && !cancelled && (
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
                  style={s.appointmentLocation}
                  numberOfLines={1}
                >
                  {isOfficeVisit ? 'Open in maps' : 'Join video call'}
                </Text>
              </TouchableOpacity>
            )}
            {cancelled && (
              <View style={s.cancelledCopyContainer}>
                <Text style={s.cancelledCopy}>
                  Appointment cancelled
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
