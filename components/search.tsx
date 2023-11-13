import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { g } from '@styles';
import { router } from 'expo-router';

const s = StyleSheet.create({
  searchButton: {
    borderRadius: g.size(4),
    overflow: 'hidden',
  },
  searchButtonBlur: {
    padding: g.size(4),
  },
});

export function Search() {
  return (
    <TouchableOpacity
      // onPress={() => null}
      onPress={() => {
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
                router.replace('initial');
              },
            },
          ],
        );
      }}
      style={s.searchButton}
    >
      <BlurView
        style={s.searchButtonBlur}
        tint="light"
        intensity={40}
      >
        <Feather name="search" size={g.size(24)} color={g.white} />
      </BlurView>
    </TouchableOpacity>
  );
}
