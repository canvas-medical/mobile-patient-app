import {
  StyleSheet, View
} from 'react-native';
import { g } from '@styles';
import Pdf from 'react-native-pdf';
import { Button } from '@components/button';
import { router, useLocalSearchParams } from 'expo-router';
import { useConsentCreate } from '@services';
import { useEffect } from 'react';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: 300,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    justifyContent: 'center',
    alignItems: 'center',
    width: g.width,
    gap: g.size(48),
  },
  pdf: {
    height: '100%',
    width: '100%',
    paddingBottom: 100,
    backgroundColor: g.white,
  }
});
export default function PdfModal() {
  const { mutate: onCreateConsent, isPending, isSuccess } = useConsentCreate();
  const params = useLocalSearchParams();
  const { uri, consentType } = params;
  const acceptAndClose = () => {
    onCreateConsent({ consent: consentType as string });
  };

  useEffect(() => {
    if (!isSuccess) return;
    router.replace({ pathname: 'consents', params: { accepted: true } });
  }, [isSuccess]);

  return (
    <View style={s.contentContainer}>
      <Pdf
        source={{ uri: uri as string }}
        style={s.pdf}
      />
      <View style={s.buttonContainer}>
        <Button
          theme="primary"
          onPress={acceptAndClose}
          disabled={isPending || isSuccess}
          label={isPending ? 'Accepting...' : 'Accept and Continue'}
        />
      </View>
    </View>
  );
}
