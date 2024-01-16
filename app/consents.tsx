import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useConsentCreate, ConsentPDFs } from '@services';
import { Button } from '@components';
import graphic from '@assets/images/graphic.png';
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
  container: {
    flex: 1,
    backgroundColor: g.primaryBlue,
  },
  contentContainer: {
    flex: 1,
    padding: g.size(36),
    gap: g.size(36),
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.66,
    aspectRatio: 1,
  },
  greeting: {
    ...g.labelXLarge,
    color: g.black,
  },
  header: {
    gap: g.size(16),
    padding: g.size(36),
    paddingTop: g.size(72),
  },
  link: {
    ...g.bodyMedium,
    textDecorationLine: 'underline',
  },
  subGreeting: {
    ...g.bodyMedium,
    color: g.neutral300,
    marginTop: g.size(2),
  },
  title: {
    ...g.titleLarge,
  },
});

export default function Consents() {
  const { mutate: onCreateConsent, isSuccess, isPending } = useConsentCreate();
  const params = useLocalSearchParams();
  const { accepted } = params;

  const isAccepted = isSuccess || accepted;

  return (
    <View style={s.container}>
      <Image
        style={s.graphic}
        source={graphic}
        contentFit="fill"
      />
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
            Please accept all necessary consents
          </Text>
        </View>
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
        </View>
        <Button
          disabled={!isAccepted}
          theme="primary"
          onPress={() => router.push('questionnaire')}
          label="Next"
        />
      </View>
    </View>
  );
}
