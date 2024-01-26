import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, DeviceEventEmitter } from 'react-native';
// import Pdf from 'react-native-pdf';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useConsentCreate } from '@services';
import { Button } from '@components/button';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: g.hs(30),
    width: '75%',
  },
  closeButton: {
    position: 'absolute',
    top: g.hs(20),
    right: g.hs(20)
  },
  contentContainer: {
    flex: 1,
    backgroundColor: g.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: g.hs(48),
  },
  pdf: {
    height: '100%',
    width: '100%',
    paddingBottom: g.hs(100),
    backgroundColor: g.white,
  }
});
export default function PdfModal() {
  const { mutate: onCreateConsent, isPending, isSuccess } = useConsentCreate();
  const params = useLocalSearchParams();
  const { consentType, isAccepted } = params;
  const accepted = isAccepted === 'true';
  const onCloseModal = () => {
    if (consentType) {
      onCreateConsent({ consent: consentType as string });
    } else router.back();
  };

  useEffect(() => {
    if (isSuccess) {
      DeviceEventEmitter.emit('event.accepted', true);
      router.back();
    }
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
        <Feather name="x" size={g.ms(28)} color={g.neutral500} />
      </TouchableOpacity>
      <View style={s.buttonContainer}>
        <Button
          theme="primary"
          onPress={onCloseModal}
          disabled={isPending || isSuccess || accepted}
          label={isPending ? 'Accepting...' : text}
        />
      </View>
    </View>
  );
}
