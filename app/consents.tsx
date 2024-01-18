import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useConsentCreate, ConsentPDFs } from '@services';
import { OnboardingScreen, Button } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  checkboxButton: {
    width: g.size(28),
    height: g.size(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(12),
    marginBottom: 'auto',
  },
  consentsContainer: {
    marginBottom: 'auto',
  },
  link: {
    ...g.bodyMedium,
    textDecorationLine: 'underline',
    color: g.neutral900,
  },
});

export default function Consents() {
  const { mutate: onCreateConsent, isSuccess, isPending } = useConsentCreate();
  const params = useLocalSearchParams();
  const { accepted } = params;

  const isAccepted = isSuccess || !!accepted;

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
            disabled={!!isAccepted}
          >
            {isPending
              ? <ActivityIndicator color={g.primaryBlue} />
              : (
                <Feather
                  name={isAccepted ? 'check-square' : 'square'}
                  size={g.size(26)}
                  color={isAccepted ? g.green : g.neutral300}
                />
              )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isPending}
            onPress={() =>
              router.push({
                pathname: 'pdf-modal',
                params: { uri: ConsentPDFs['Consent Document'], consentType: 'Consent Document', isAccepted: isSuccess || null }
              })}
          >
            <Text style={s.link}>General Consent Document</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        disabled={!isAccepted}
        theme="primary"
        onPress={() => router.push('questionnaire')}
        label="Next"
      />
    </OnboardingScreen>
  );
}
