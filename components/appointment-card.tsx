import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather, FontAwesome } from '@expo/vector-icons';
// import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Appointment } from '@interfaces';
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
  // practitionerLocation: {
  //   ...g.bodyMedium,
  //   color: g.white,
  //   textDecorationLine: 'underline',
  // },
  // pressable: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: g.size(4),
  // }
});

export function AppointmentCard({ appt }: { appt: Appointment }) {
  const {
    id,
    start,
    end,
    reasonCode,
    // appointmentType: { coding },
    // contained: [{ address }],
  } = appt;

  const formattedDate = new Date(start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  // TODO: review displays to see if there are any other ways that telemedicine is displayed
  // const needsMapLink = coding[0].display !== 'Telemedicine' && coding[0].display !== 'Telehealth';

  // const url = needsMapLink && Platform.select({
  //   ios: `https://maps.apple.com?address=${address}`,
  //   android: `https://www.google.com/maps/search/?api=1&query=${address}`,
  // });

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
              {formatTime(start, false)}
              {' '}
              -
              {' '}
              {formatTime(end, true)}
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
                {reasonCode[0].text.charAt(0).toUpperCase() + reasonCode[0].text.slice(1)}
              </Text>
              {/* <TouchableOpacity
                {reasonDisplay}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(url || address)}
                style={s.pressable}
              >
                {needsMapLink
                  ? <Ionicons name="navigate" size={g.size(18)} color={g.white} />
                  : <MaterialIcons name="video-call" size={g.size(20)} color={g.white} />
                }
                <Text
                  style={s.practitionerLocation}
                  numberOfLines={1}
                >
                  {url ? address : 'Join video call'}
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
