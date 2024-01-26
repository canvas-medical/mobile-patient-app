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
import { g } from '@styles';

const s = StyleSheet.create({
  appointmentAddress: {
    ...g.bodyMedium,
    color: g.neutral600,
    textDecorationLine: 'underline',
  },
  appointmentLocation: {
    ...g.bodySmall,
    color: g.neutral600,
  },
  appointmentType: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: g.ms(4),
    gap: g.ms(4),
  },
  appointmentTypeText: {
    ...g.bodyMedium,
    color: g.neutral600,
  },
  cancelButtonDisabled: {
    opacity: 0.4,
  },
  cancelledCopy: {
    ...g.bodyMedium,
    color: g.severityRed,
  },
  cancelledCopyContainer: {
    minHeight: g.hs(28),
    padding: g.ms(4),
    justifyContent: 'center',
  },
  card: {
    backgroundColor: g.white,
    borderRadius: g.ms(6),
  },
  cardCancelled: {
    opacity: 0.5,
  },
  cardContent: {
    paddingVertical: g.hs(12),
    paddingHorizontal: g.ms(16),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.ms(12),
  },
  dataDivider: {
    height: g.hs(1),
    width: '100%',
    backgroundColor: g.neutral300,
    marginVertical: g.hs(16),
    borderRadius: g.ms(1),
  },
  dateTime: {
    ...g.bodyMedium,
    color: g.neutral600,
    flex: 1,
  },
  leftBorder: {
    position: 'absolute',
    left: 0,
    top: g.hs(6),
    bottom: g.hs(6),
    width: g.ms(4),
    borderRadius: g.ms(4),
    backgroundColor: g.neutral500,
  },
  navLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: g.ms(4),
    paddingLeft: 0,
    gap: g.ms(4),
    minHeight: g.hs(28),
  },
  reason: {
    ...g.bodyXLarge,
    color: g.neutral900,
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
    appointmentType: { coding: [{ display: appointmentTypeText = '' } = {}] = [] } = {},
    reasonCode: [{ text: reasonText = '' } = {}] = [],
    contained: [{ address = '' } = {}] = [],
    status = '',
    participant = [{ actor: { type: '', reference: '' } }],
  } = appointment ?? {};
  const { data: clinicAddress } = useClinicLocation();
  const { mutate: onCancelAppointment, isPending } = useCancelAppointment();
  const isOfficeVisit = appointmentTypeText === 'Office Visit';
  const isHomeVisit = appointmentTypeText === 'Home Visit';
  const isTelemedicine = appointmentTypeText === 'Telemedicine';
  const isPhoneCall = appointmentTypeText === 'Phone Call';
  const cancelled = status === 'cancelled';

  const practitionerID = participant?.find((p) => p.actor?.type === 'Practitioner')?.actor?.reference;
  const startTime = new Date(start).getTime();
  const currentTime = new Date().getTime();
  const isWithin30MinBeforeOr15MinAfterApptTime = currentTime >= startTime - 30 * 60 * 1000 && currentTime <= startTime + 15 * 60 * 1000;
  const isWithin48HoursOfStartTime = Math.abs(currentTime - startTime) <= 48 * 60 * 60 * 1000;
  const isFutureDate = new Date(startTime).getTime() > new Date().getTime();
  const displayNavLink = ((!isOfficeVisit && !!address)
    || (isOfficeVisit && !!clinicAddress))
    && (currentTime <= startTime + 15 * 60 * 1000);

  const url = isOfficeVisit ? Platform.select({
    ios: `https://maps.apple.com?address=${clinicAddress}`,
    android: `https://www.google.com/maps/search/?api=1&query=${clinicAddress}`,
  }) : address;

  const cancelAppointment = () => {
    if (isWithin48HoursOfStartTime) {
      Alert.alert(
        'You are within 48 hours of your appointment time.',
        'Please contact your provider to cancel this appointment.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
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
                        appointmentType: appointmentTypeText,
                      });
                    },
                  },
                ],
              );
            },
          },
        ],
      );
    }
  };

  return (
    <View style={[s.card, !cancelled && { ...g.cardShadow }, cancelled && s.cardCancelled]}>
      <View style={s.leftBorder} />
      <View style={s.cardContent}>
        <View style={s.cardRow}>
          <Feather name="clock" size={g.ms(24)} color={g.neutral500} />
          <Text
            style={s.dateTime}
            numberOfLines={1}
          >
            {formatDate(start)}
            &nbsp;
            •
            &nbsp;
            {formatTime(start)}
            {' '}
            -
            {' '}
            {formatTime(end, true, true)}
          </Text>
          {isPending && <ActivityIndicator color={g.primaryBlue} size="small" />}
          {!cancelled && isFutureDate && (
            <TouchableOpacity
              style={isWithin48HoursOfStartTime && s.cancelButtonDisabled}
              onPress={cancelAppointment}
              disabled={cancelled || isPending}
            >
              <MaterialIcons name="delete-forever" size={g.ms(24)} color={g.neutral500} />
            </TouchableOpacity>
          )}
        </View>
        <View style={s.dataDivider} />
        <View style={s.cardRow}>
          <FontAwesome5 name="user-md" size={g.ms(36)} color={g.neutral500} />
          <View style={s.reasonData}>
            <Text
              style={s.reason}
              numberOfLines={1}
            >
              {capitalizeFirstCharacter(reasonText)}
            </Text>
            {displayNavLink && !cancelled ? (
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
                {isOfficeVisit && <Ionicons name="navigate" size={g.ms(18)} color={g.neutral500} />}
                {isTelemedicine && <MaterialIcons name="video-call" size={g.ms(20)} color={g.neutral500} />}
                {isPhoneCall && <FontAwesome5 name="phone-alt" size={g.ms(20)} color={g.neutral500} />}
                <View>
                  <Text
                    style={s.appointmentLocation}
                    numberOfLines={1}
                  >
                    {isOfficeVisit ? 'Get directions' : 'Join'}
                  </Text>
                  <Text
                    style={s.appointmentAddress}
                    numberOfLines={1}
                  >
                    {isOfficeVisit && clinicAddress}
                    {isTelemedicine && 'Video Call'}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={s.appointmentType}>
                {isPhoneCall && (
                  <>
                    <FontAwesome5 name="phone-alt" size={g.ms(16)} color={g.neutral500} />
                    <Text
                      style={s.appointmentTypeText}
                      numberOfLines={1}
                    >
                      Call from Provider
                    </Text>
                  </>
                )}
                {isHomeVisit && (
                  <>
                    <Ionicons name="home" size={g.ms(16)} color={g.neutral500} />
                    <Text
                      style={s.appointmentTypeText}
                      numberOfLines={1}
                    >
                      Home Visit
                    </Text>
                  </>
                )}
              </View>
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
