import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useConsentCreate, ConsentPDFs } from '@services';
import { OnboardingScreen, Button } from '@components';
import { g } from '@styles';
import React, { useEffect, useState } from 'react';

const s = StyleSheet.create({
  checkboxButton: {
    width: g.ms(28),
    height: g.ms(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.ws(12),
  },
  consentsContainer: {
    flex: 1,
    gap: g.hs(16),
  },
  link: {
    ...g.bodyMedium,
    textDecorationLine: 'underline',
    color: g.neutral900,
  },
});

export default function Consents() {
  const navigation = useNavigation();
  const { mutate: onCreateConsent, isSuccess, isPending } = useConsentCreate();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;
    setAccepted(true);
  }, [isSuccess, navigation]);

  useFocusEffect(
    React.useCallback(() => {
      DeviceEventEmitter.addListener('event.accepted', (bool) => setAccepted(bool));
    }, [accepted, navigation])
  );

  return (
    <OnboardingScreen
      title="Consents"
      subGreeting="Please review and accept the following consents"
      scrollEnabled={false}
    >
      <View style={s.consentsContainer}>
        <View style={s.consentItem}>
          <TouchableOpacity
            style={s.checkboxButton}
            onPress={() => onCreateConsent({ consent: 'Consent Document' })}
            disabled={!!accepted}
          >
            {isPending
              ? <ActivityIndicator color={g.primaryBlue} size="small" />
              : (
                <Feather
                  name={accepted ? 'check-square' : 'square'}
                  size={g.ms(26)}
                  color={accepted ? g.green : g.neutral300}
                />
              )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isPending}
            onPress={() =>
              router.push({
                pathname: 'pdf-modal',
                params: { uri: ConsentPDFs['Consent Document'], consentType: 'Consent Document', isAccepted: accepted }
              })}
          >
            <Text style={s.link}>General Consent Document</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        disabled={!accepted}
        theme="primary"
        onPress={() => {
          DeviceEventEmitter.removeAllListeners('event.accepted');
          router.push('questionnaire');
        }}
        label="Next"
      />
    </OnboardingScreen>
  );
}
