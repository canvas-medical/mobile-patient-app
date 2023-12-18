import React from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text, ActivityIndicator, Alert, TouchableOpacity
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Modal from 'react-native-modal';
import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePatient } from '@services';
import { Patient } from '@interfaces';
import { Button } from '@components/index';
import { g } from '@styles';

const s = StyleSheet.create({
  body: {
    ...g.labelMedium,
    color: g.white,
    paddingLeft: g.size(8),
  },
  bodyContainer: {
    alignItems: 'flex-start',
    gap: g.size(20),
    padding: g.size(16),
    backgroundColor: g.secondaryBlue,
    borderRadius: g.size(16),
  },
  buttonContainer: {
    alignSelf: 'center',
    width: g.width * 0.5,
  },
  closeButton: {
    position: 'absolute',
    top: g.size(40),
    right: g.size(20)
  },
  container: {
    gap: g.size(16),
    padding: g.size(32),
    backgroundColor: g.white,
    borderRadius: g.size(16),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItemLarge: {
    width: '66%',
    marginVertical: g.size(4),
  },
  gridItemSmall: {
    width: '34%',
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
    color: g.secondaryBlue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: g.size(20),
    paddingLeft: g.size(4),
    padding: g.size(8),
  },
});

const formattedDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'utc' });
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export function Profile({ modalVisible, setModalVisible }: {modalVisible: boolean, setModalVisible: (boolean) => void}) {
  const { data: profile, isLoading: profileLoading }: {data: Patient, isLoading: boolean} = usePatient();
  if (profileLoading) return <ActivityIndicator size="large" color={g.white} />;
  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      isVisible={modalVisible}
      customBackdrop={(
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: g.primaryBlue, opacity: 0.8 }} />
        </TouchableWithoutFeedback>
      )}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.container}>
          <TouchableOpacity style={s.closeButton} onPress={() => setModalVisible(false)}>
            <Feather name="x" size={32} color={g.neutral500} />
          </TouchableOpacity>
          <View style={s.titleContainer}>
            <Image source={{ uri: profile.photo[0].url }} style={s.image} />
            <Text style={s.name}>{`${profile.name[0].given[0]} ${profile.name[0].family}`}</Text>
          </View>
          <View style={s.bodyContainer}>
            <View style={s.grid}>
              <View style={[s.row, s.gridItemLarge]}>
                <Feather name="phone" size={g.size(24)} color={g.white} />
                <Text style={s.body}>{profile.telecom[0].value}</Text>
              </View>
              <View style={[s.row, s.gridItemSmall]}>
                <MaterialIcons name="person" size={g.size(24)} color={g.white} />
                <Text style={s.body}>{capitalizeFirstLetter(profile.gender)}</Text>
              </View>
              <View style={[s.row, s.gridItemLarge]}>
                <FontAwesome name="birthday-cake" size={g.size(24)} color={g.white} />
                <Text style={s.body}>{formattedDate(profile.birthDate)}</Text>
              </View>
              <View style={[s.row, s.gridItemSmall]}>
                <MaterialIcons name="language" size={g.size(24)} color={g.white} />
                <Text style={s.body}>{profile.communication[0].language.text}</Text>
              </View>
            </View>
            <View style={s.row}>
              <Ionicons name="home" size={24} color={g.white} />
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
              theme="primary"
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
    </Modal>
  );
}
