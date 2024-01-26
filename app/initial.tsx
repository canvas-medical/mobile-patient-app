import { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Button } from '@components';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  buttonContainer: {
    marginTop: g.hs(96),
    gap: g.hs(16),
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: g.ws(36),
    paddingBottom: g.hs(120),
    backgroundColor: g.tertiaryBlue,
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.8,
    aspectRatio: 59 / 77,
  },
  modal: {
    paddingHorizontal: g.ws(8),
    paddingBottom: g.hs(12),
    backgroundColor: g.white,
    width: '85%',
    maxWidth: 375,
    borderRadius: g.ms(16),
    gap: g.hs(4),
    alignSelf: 'center',
  },
  or: {
    ...g.titleLarge,
    color: g.white,
    textAlign: 'center'
  },
  pickerItem: {
    ...g.bodyLarge,
    color: g.neutral900,
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
    marginBottom: g.hs(20),
  },
  version: {
    ...g.bodySmall,
    color: g.neutral100,
    opacity: 0.7,
    position: 'absolute',
    left: g.ws(16),
    bottom: g.ws(16)
  }
});

export default function Initial() {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

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
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={show}
          swipeDirection="right"
          onSwipeComplete={() => setShow(false)}
          customBackdrop={(
            <TouchableWithoutFeedback onPress={() => setShow(false)}>
              <View style={s.backdrop} />
            </TouchableWithoutFeedback>
          )}
        >
          <View style={s.modal}>
            <Picker
              itemStyle={s.pickerItem}
              selectedValue={value}
              onValueChange={(patientId: string) => setValue(patientId)}
            >
              {demoPatients.map((option) => <Picker.Item key={option.value} label={option.label} value={option.value} />)}
            </Picker>
            <Button
              label="Login"
              disabled={!value}
              theme="primary"
              onPress={() => signInDemoPatient()}
            />
          </View>
        </Modal>
      )}
      <Text style={s.version}>
        Version: 1.1.2
      </Text>
    </View>
  );
}
