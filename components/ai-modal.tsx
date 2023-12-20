import { Text, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';
import { useOpenAiSummary } from '@services';
import { g } from '@styles';

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
  loading: {
    paddingVertical: g.size(32),
  },
  modal: {
    marginHorizontal: g.size(12),
  },
  text: {
    ...g.bodyMedium,
    color: g.secondaryBlue,
    textAlign: 'center',
    padding: g.size(16),
  },
});

export function AiModal({
  id, resourceType, codes, description, modalVisible, setModalVisible
}: { id: string, resourceType: string, codes: {code: string, system: string}[], description: string, modalVisible: boolean, setModalVisible: (boolean) => void}) {
  const { data, isPending, isSuccess } = useOpenAiSummary(id, resourceType, description, codes);
  const summary = data?.content;
  const disclaimer = data?.disclaimer;

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={modalVisible}
      swipeDirection="right"
      onSwipeComplete={() => setModalVisible(false)}
      style={s.modal}
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
        {isPending && <ActivityIndicator style={s.loading} color={g.secondaryBlue} />}
        {isSuccess && <Text style={s.text}>{summary}</Text>}
        <Text style={s.disclaimer}>{disclaimer}</Text>
      </View>
    </Modal>
  );
}
