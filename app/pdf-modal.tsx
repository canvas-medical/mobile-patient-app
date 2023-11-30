import {
  StyleSheet, TouchableOpacity, View
} from 'react-native';
import { g } from '@styles';
import Pdf from 'react-native-pdf';
import { Button } from '@components/button';
import { router, useLocalSearchParams } from 'expo-router';
import { useConsentCreate } from '@services';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    width: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20
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
  const { uri, consentType, isAccepted, noActionOnClose } = params;
  const acceptAndClose = () => {
    if (noActionOnClose) {
      router.back();
    } else {
      onCreateConsent({ consent: consentType as string });
    }
  };

  useEffect(() => {
    if (!isSuccess) return;
    router.replace({ pathname: 'consents', params: { accepted: true } });
  }, [isSuccess]);
  console.log(uri);

  const text = noActionOnClose ? 'Close' : 'Accept and Continue';

  return (
    <View style={s.contentContainer}>
      <Pdf
        source={{ uri: uri as string }}
        style={s.pdf}
      />
      <TouchableOpacity style={s.closeButton} onPress={() => router.canGoBack() && router.back()}>
        <Feather name="x" size={32} color={g.neutral500} />
      </TouchableOpacity>
      <View style={s.buttonContainer}>
        <Button
          theme="primary"
          onPress={acceptAndClose}
          disabled={isPending || isSuccess || !!isAccepted}
          label={isPending ? 'Accepting...' : text}
        />
      </View>
    </View>
  );
}
