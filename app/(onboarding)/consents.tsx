import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Feather, } from '@expo/vector-icons';
import { Button, Screen } from '@components';
import { g } from '@styles';
import { PdfModal } from '@components/pdf-modal';
import { useState } from 'react';
import { ConsentPdfs, useConsentCreate } from '@services/consent';

const s = StyleSheet.create({
  button: {
    width: 300,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: g.width,
    alignItems: 'center',
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(12),
  },
  container: {
    flex: 1,
    height: g.height,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    padding: g.size(36),
    justifyContent: 'space-between',
    gap: g.size(48),
  },
  formContainer: {
    flex: 1,
    gap: g.size(56),
  },
  greeting: {
    ...g.labelXLarge,
    color: g.black,
  },
  header: {
    padding: g.size(36),
    paddingTop: g.size(72),
  },
  scrollCover: {
    width: g.width,
    height: g.height * 0.6,
    backgroundColor: g.white,
    position: 'absolute',
    bottom: 0,
  },
  subGreeting: {
    ...g.bodyMedium,
    color: g.neutral300,
    marginTop: g.size(2),
  },
  title: {
    ...g.titleLarge,
    marginTop: g.size(16),
  },
});

export default function Consents() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { mutate: onCreateConsent, isSuccess } = useConsentCreate();

  const onClick = async () => {
    onCreateConsent({ consent: 'Consent Document' });
    setModalVisible(false);
  };

  return (
    <Screen>
      <View style={s.scrollCover} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={s.container}>
              <View style={s.header}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Feather
                    name="arrow-left"
                    size={g.size(36)}
                    color={g.white}
                  />
                </TouchableOpacity>
                <Text style={s.title}>
                  Consents
                </Text>
              </View>
              <View style={s.contentContainer}>
                <View>
                  <Text style={s.greeting}>
                    Welcome
                  </Text>
                  <Text style={s.subGreeting}>
                    Fill out a few personal details to get started
                  </Text>
                </View>
                <View style={s.formContainer}>
                  <TouchableOpacity style={s.consentItem} onPress={() => setModalVisible(true)}>
                    <Feather
                      name={isSuccess ? 'check-square' : 'square'}
                      size={g.size(26)}
                      color={g.neutral200}
                    />
                    <Text>General Consent Document</Text>
                  </TouchableOpacity>
                </View>
                <View style={s.buttonContainer}>
                  <View style={s.button}>
                    <Button
                      disabled={!isSuccess}
                      theme="primary"
                      onPress={() => router.push('questionnaire')}
                      label="Next"
                    />
                  </View>
                </View>
                <PdfModal modalVisible={modalVisible} onAccept={onClick} setModalVisible={setModalVisible} uri={ConsentPdfs['Consent Document']} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
