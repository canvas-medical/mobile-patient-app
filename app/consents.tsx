import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather, } from '@expo/vector-icons';
import { ConsentPDFs, useConsentCreate } from '@services';
import { Button, Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    marginTop: 'auto',
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(12),
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    padding: g.size(36),
    gap: g.size(48),
  },
  greeting: {
    ...g.labelXLarge,
    color: g.black,
  },
  header: {
    padding: g.size(36),
    paddingTop: g.size(72),
  },
  link: {
    ...g.bodyMedium,
    textDecorationLine: 'underline',
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
  const { mutate: onCreateConsent, isSuccess, isPending } = useConsentCreate();
  const params = useLocalSearchParams();
  const { accepted } = params;

  const isAccepted = isSuccess || accepted;

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
                <View style={s.consentItem}>
                  <TouchableOpacity disabled={!!isAccepted} onPress={() => onCreateConsent({ consent: 'Consent Document' })}>
                    {isPending
                      ? <ActivityIndicator color={g.primaryBlue} />
                      : (
                        <Feather
                          name={isAccepted ? 'check-square' : 'square'}
                          size={g.size(26)}
                          color={isAccepted ? 'green' : g.neutral200}
                        />
                      )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isPending}
                    onPress={() =>
                      router.push({
                        pathname: 'pdf-modal',
                        params: { uri: ConsentPDFs['Consent Document'], consentType: 'Consent Document', isAccepted: isSuccess }
                      })}
                  >
                    <Text style={s.link}>General Consent Document</Text>
                  </TouchableOpacity>
                </View>
                <View style={s.buttonContainer}>
                  <Button
                    disabled={!isAccepted}
                    theme="primary"
                    onPress={() => router.push('questionnaire')}
                    label="Next"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
