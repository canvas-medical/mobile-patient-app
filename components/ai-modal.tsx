import { Text, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { useOpenAiSummary } from '@services';
import { g } from '@styles';
import { FontAwesome } from '@expo/vector-icons';

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: g.white,
    padding: g.size(16),
    paddingTop: 0,
    borderBottomRightRadius: g.size(16),
    borderBottomLeftRadius: g.size(16),
  },
  disclaimer: {
    ...g.bodySmall,
    color: g.neutral300,
    lineHeight: g.size(13),
    textAlign: 'justify',
  },
  header: {
    ...g.titleSmall,
    color: g.white,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: g.size(8),
    padding: g.size(16),
    backgroundColor: g.secondaryBlue,
    borderTopRightRadius: g.size(16),
    borderTopLeftRadius: g.size(16),
  },
  text: {
    ...g.bodyMedium,
    color: g.secondaryBlue,
    textAlign: 'center',
    padding: g.size(16),
  },
});

export function AiModal({
  id, resourceType, hl7code, snomed, description, modalVisible, setModalVisible
}: { id: string, resourceType: string, hl7code: string, snomed: string, description: string, modalVisible: boolean, setModalVisible: (boolean) => void}) {
  const disclaimer = 'This is a computer-generated description. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read here. Reliance on any information provided by this Site, its employees, or other visitors to the Site is solely at your own risk.';
  // const disclaimer = 'The AI-generated medical summaries provided by this application are intended for informational purposes only.'
  //   + ' They are not a substitute for professional medical advice, '
  //   + 'diagnosis, or treatment.';
  // eslint-disable-next-line max-len
  const dummyResponse = 'This is a dummy response for this prompt: "Please tell me what this health condition means, how it might affect my life, and what options I might have to address it: Mixed hyperlipidemia. The HL7 code for this condiion is "E782", and the equivalent SNOMED code is "267434003", but do not include these codes in your response.".';
  console.log(hl7code, snomed, description);
  const { data: summary, isPending, isSuccess } = useOpenAiSummary(id, resourceType, description, hl7code, snomed);
  console.log(summary);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={modalVisible}
      swipeDirection="right"
      onSwipeComplete={() => setModalVisible(false)}
      customBackdrop={(
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={s.backdrop} />
        </TouchableWithoutFeedback>
      )}
    >
      <View style={s.headerContainer}>
        <FontAwesome name="lightbulb-o" size={24} color={g.goldenYellow} />
        <Text style={s.header}>Explain</Text>
      </View>
      <View style={s.container}>
        {isPending && <ActivityIndicator color={g.secondaryBlue} />}
        {isSuccess && <Text style={s.text}>{summary}</Text>}
        <Text style={s.disclaimer}>{disclaimer}</Text>
      </View>
    </Modal>
  );
}
