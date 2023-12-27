import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Overlay } from '@rneui/themed';
import { Button, Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    marginTop: g.size(96),
    gap: g.size(16),
  },
  container: {
    justifyContent: 'flex-end',
    paddingHorizontal: g.size(36),
  },
  or: {
    ...g.titleLarge,
    textAlign: 'center'
  },
  pickerOverlay: {
    width: '85%',
    borderRadius: g.size(16),
    backgroundColor: g.white,
  },
  subtitle: {
    ...g.bodyXLarge,
    color: g.white,
  },
  subtitleEmphasized: {
    ...g.titleSmall,
  },
  title: {
    ...g.titleLarge,
    marginBottom: g.size(20),
  },
  version: {
    ...g.bodySmall,
    color: g.neutral100,
    textAlign: 'left',
    marginTop: g.size(192),
    bottom: g.size(22)
  }
});

export default function Initial() {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [currentPatientName, setCurrentPatientName] = useState<string>('');

  const demoPatients = [
    { label: 'Select a patient', value: '' },
    { label: 'Kristen - Senior Female', value: 'a2d481743b774bbbb7084254cf384bac' },
    { label: 'Owen - Onc Single', value: '458b394369f34c50b63e46535b4f7722' },
    { label: 'Donna - 52 Female', value: 'ae16fa0710894e999390abdec2859906' },
  ];

  const signInDemoPatient = async () => {
    setShow(false);
    await SecureStore.setItemAsync('patient_id', value);
    router.push('(tabs)/my-health');
  };

  useEffect(() => {
    if (value) setCurrentPatientName(demoPatients.find((demo) => value === demo.value)?.label.split(' ')[0]);
    else setCurrentPatientName('');
  }, [value]);

  return (
    <Screen style={s.container}>
      <Text style={s.title}>Welcome</Text>
      <Text style={s.subtitle}>Manage your medical records</Text>
      <Text style={s.subtitleEmphasized}>seamlessly and intuitively</Text>
      <View style={s.buttonContainer}>
        <Button
          label="Register"
          theme="tertiary"
          onPress={() => router.push('personal-details')}
        />
        <Text style={s.or}>or</Text>
        <Button
          label="Login as a demo patient"
          theme="tertiary"
          onPress={() => setShow(true)}
        />
      </View>
      {show && (
        <Overlay
          isVisible={show}
          onBackdropPress={() => setShow(false)}
          overlayStyle={s.pickerOverlay}
        >
          <Picker
            selectedValue={value}
            onValueChange={(patientId: string) => setValue(patientId)}
          >
            {demoPatients.map((option) => <Picker.Item key={option.value} label={option.label} value={option.value} />)}
          </Picker>
          <Button
            label={value ? `Login as ${currentPatientName}` : 'Login as demo patient'}
            disabled={!value}
            theme="primary"
            onPress={() => signInDemoPatient()}
          />
        </Overlay>
      )}
      <Text style={s.version}>
        {/* TODO: remove API here */}
        Version: 1.0.0 (9) | API:
        {process.env.EXPO_PUBLIC_API_URL}
      </Text>
    </Screen>
  );
}
