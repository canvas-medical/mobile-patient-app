import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import Pdf from 'react-native-pdf';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useConsentCreate } from '@services';
import { Button } from '@components/button';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: g.size(30),
    width: g.size(300),
  },
  closeButton: {
    position: 'absolute',
    top: g.size(40),
    right: g.size(20)
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
    paddingBottom: g.size(100),
    backgroundColor: g.white,
  }
});
export default function PdfModal() {
  const { mutate: onCreateConsent, isPending, isSuccess } = useConsentCreate();
  const params = useLocalSearchParams();
  const { uri, consentType, isAccepted } = params;
  const onCloseModal = () => {
    if (consentType) {
      onCreateConsent({ consent: consentType as string });
    } else router.back();
  };

  useEffect(() => {
    if (!isSuccess) return;
    router.replace({ pathname: 'consents', params: { accepted: true } });
  }, [isSuccess]);

  const text = consentType ? 'Accept and Continue' : 'Close';

  return (
    <View style={s.contentContainer}>
      {/* <Pdf
        trustAllCerts={false}
        source={{ uri: uri as string }}
        style={s.pdf}
      /> */}
      <TouchableOpacity style={s.closeButton} onPress={() => router.canGoBack() && router.back()}>
        <Feather name="x" size={32} color={g.neutral500} />
      </TouchableOpacity>
      <View style={s.buttonContainer}>
        <Button
          theme="primary"
          onPress={onCloseModal}
          disabled={isPending || isSuccess || !!isAccepted}
          label={isPending ? 'Accepting...' : text}
        />
      </View>
    </View>
  );
}
