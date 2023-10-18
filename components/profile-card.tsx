import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { g } from '@styles';

import { userData } from '../dummyData';

const s = StyleSheet.create({
  container: {
    ...g.shadow,
    width: '100%',
    marginVertical: g.size(16),
  },
  dataColumn: {
    flex: 1,
    gap: g.size(8),
  },
  dataContainer: {
    flexDirection: 'row',
    gap: g.size(8),
  },
  dataPoint: {
    ...g.bodySmall,
    color: g.white,
    flex: 1,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(12),
  },
  profileCard: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  profileCardBlur: {
    width: '100%',
    padding: g.size(16),
    alignItems: 'flex-start',
    gap: g.size(12),
  },
  userAddress: {
    ...g.bodyLarge,
    color: g.white,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(12),
  },
  userName: {
    ...g.bodyXLarge,
    color: g.white,
  },
  userNameAddressContainer: {
    flex: 1,
    gap: g.size(4),
  },
});

export function ProfileCard() {
  return (
    <View style={s.container}>
      <View style={s.profileCard}>
        <BlurView
          style={s.profileCardBlur}
          tint="light"
          intensity={40}
        >
          <View style={s.userContainer}>
            <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />
            <View style={s.userNameAddressContainer}>
              <Text
                style={s.userName}
                numberOfLines={1}
              >
                {userData.name}
              </Text>
              <Text
                style={s.userAddress}
                numberOfLines={1}
              >
                {userData.address}
              </Text>
            </View>
          </View>
          <View style={s.dataContainer}>
            <View style={s.dataColumn}>
              <View style={s.dataRow}>
                <FontAwesome name="birthday-cake" size={g.size(14)} color="white" />
                <Text
                  style={s.dataPoint}
                  numberOfLines={1}
                >
                  {userData.birthday}
                </Text>
              </View>
              <View style={s.dataRow}>
                <FontAwesome5 name="phone-alt" size={g.size(14)} color="white" />
                <Text
                  style={s.dataPoint}
                  numberOfLines={1}
                >
                  {userData.phone}
                </Text>
              </View>
              <View style={s.dataRow}>
                <FontAwesome name="envelope" size={g.size(14)} color="white" />
                <Text
                  style={s.dataPoint}
                  numberOfLines={1}
                >
                  {userData.email}
                </Text>
              </View>
            </View>
            <View style={s.dataColumn}>
              <View style={s.dataRow}>
                <FontAwesome name="user" size={g.size(14)} color="white" />
                <Text
                  style={s.dataPoint}
                  numberOfLines={1}
                >
                  {userData.sex}
                </Text>
              </View>
              <View style={s.dataRow}>
                <FontAwesome name="user" size={g.size(14)} color="white" />
                <Text
                  style={s.dataPoint}
                  numberOfLines={1}
                >
                  {userData.race}
                </Text>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}
