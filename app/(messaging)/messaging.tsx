import {
  StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';
import { g } from '@styles';
import { MessageBlock } from '@components';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  QuestionnaireIds,
  useCommunication, useCommunicationSubmit,
  usePaymentNoticeSubmit,
  useQuestionnaire,
  useQuestionnaireSubmit
} from '@services';

const s = StyleSheet.create({
  container: {
    paddingHorizontal: g.size(36),
    paddingBottom: g.size(192),
    gap: g.size(16),
    alignItems: 'center'
  },
  input: {
    ...g.bodyMedium,
    color: g.black,
    backgroundColor: g.white,
    width: g.width * 0.8,
    borderRadius: g.size(25),
    paddingTop: g.size(8),
    paddingBottom: g.size(4),
    paddingHorizontal: g.size(16),
  },
  inputContainer: {
    position: 'absolute',
    width: g.width * 0.9,
    bottom: g.size(112),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: g.white,
    borderRadius: g.size(25),
  },
});

export default function Messaging() {
  const [message, setMessage] = useState<string>('');
  const [size, setSize] = useState<number>(32);
  const [error, setError] = useState<string>('');
  const { isFetching, data: messages } = useCommunication();
  const { mutate: onMessageSubmit, isPending } = useCommunicationSubmit();
  const updateSize = (num: number) => {
    if (num > 32 && num < 500) {
      setSize(num);
    }
  };
  return (
    <View style={s.container}>
      <MessageBlock received={false} />
      <MessageBlock received />
      <View style={s.inputContainer}>
        <TextInput
          style={{ ...s.input, height: size }}
          multiline
          editable
          placeholder="Message here..."
          value={message}
          onChange={(e) => setMessage(e.nativeEvent.text)}
          onFocus={() => null}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="send"
          onSubmitEditing={() => null}
          textContentType="none"
          placeholderTextColor={error ? g.neutral500 : g.neutral200}
          onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
        />
        {isPending ? (

          <Spin
          ) :
        <TouchableOpacity
          onPress={() => onMessageSubmit(message)}
        >
          <Ionicons name="arrow-up-circle" size={g.size(36)} color={g.primaryBlue} />
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}
