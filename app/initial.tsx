import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Overlay } from '@rneui/themed';
import { Button } from '@components';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    marginTop: g.size(96),
    gap: g.size(16),
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: g.size(36),
    paddingBottom: g.size(120),
    backgroundColor: g.tertiaryBlue,
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.8,
    aspectRatio: 59 / 77,
  },
  or: {
    ...g.titleLarge,
    color: g.white,
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
    color: g.white,
  },
  title: {
    ...g.titleLarge,
    color: g.white,
    marginBottom: g.size(20),
  },
  version: {
    ...g.bodySmall,
    color: g.neutral100,
    opacity: 0.7,
    position: 'absolute',
    left: g.size(16),
    bottom: g.size(16)
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
    <View style={s.container}>
      <Image
        style={s.graphic}
        source={graphic}
      />
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
        Version: 1.1.0
      </Text>
    </View>
  );
}
