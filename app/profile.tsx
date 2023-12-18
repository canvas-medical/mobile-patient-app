import React from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text, ActivityIndicator, Alert
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePatient } from '@services';
import { Patient } from '@interfaces';
import { Button } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  body: {
    ...g.labelMedium,
    color: g.secondaryBlue,
    paddingLeft: g.size(8),
  },
  bodyContainer: {
    alignItems: 'flex-start',
    gap: g.size(20),
    padding: g.size(16),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: g.size(16),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: g.size(32),
    alignSelf: 'center',
    width: g.width * 0.5,
  },
  container: {
    flex: 1,
    gap: g.size(16),
    padding: g.size(32),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    marginVertical: g.size(4),
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: g.size(16),
    marginLeft: g.size(4)
  },
  name: {
    ...g.titleMedium,
    color: g.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: g.size(20),
    paddingLeft: g.size(4),
    padding: g.size(8),
  },
});

function ProfileDetail({ icon: Icon, iconName, text }) {
  return (
    <View style={[s.row, s.gridItem]}>
      <Icon name={iconName} size={g.size(24)} color={g.secondaryBlue} />
      <Text style={s.body}>{text}</Text>
    </View>
  );
}

const formattedDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'utc' });
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export default function Billing() {
  const { data: profile, isLoading: profileLoading }: {data: Patient, isLoading: boolean} = usePatient();
  console.log(profile);
  if (profileLoading) return <ActivityIndicator size="large" color={g.white} />;
  return (
    <LinearGradient
      style={s.screen}
      colors={[g.primaryBlue, g.secondaryBlue]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.container}>
          <View style={s.titleContainer}>
            <Image source={{ uri: profile.photo[0].url }} style={s.image} />
            <Text style={s.name}>{`${profile.name[0].given[0]} ${profile.name[0].family}`}</Text>
          </View>
          <View style={s.bodyContainer}>
            <View style={s.grid}>
              <ProfileDetail
                icon={Feather}
                iconName="phone"
                text={profile.telecom[0].value}
              />
              <ProfileDetail
                icon={MaterialIcons}
                iconName="person"
                text={capitalizeFirstLetter(profile.gender)}
              />
              <ProfileDetail
                icon={FontAwesome}
                iconName="birthday-cake"
                text={formattedDate(profile.birthDate)}
              />
              <ProfileDetail
                icon={MaterialIcons}
                iconName="language"
                text={profile.communication[0].language.text}
              />
            </View>
            <View style={s.row}>
              <Ionicons name="home" size={24} color={g.secondaryBlue} />
              <View>
                <Text style={s.body}>
                  {profile.address[0].line[0]}
                </Text>
                <Text style={s.body}>
                  {`${profile.address[0].city}, ${profile.address[0].state} ${profile.address[0].postalCode}`}
                </Text>
                <Text style={s.body}>
                  {profile.address[0].country}
                </Text>
              </View>
            </View>
          </View>
          <View style={s.buttonContainer}>
            <Button
              label="Logout"
              theme="secondary"
              onPress={() =>
                Alert.alert(
                  'Are you sure?',
                  'This will delete all of your data and log you out.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Log Out',
                      style: 'destructive',
                      onPress: () => {
                        SecureStore.deleteItemAsync('patient_id');
                        SecureStore.deleteItemAsync('push_token');
                        router.replace('initial');
                      },
                    },
                  ]
                )
            }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}
