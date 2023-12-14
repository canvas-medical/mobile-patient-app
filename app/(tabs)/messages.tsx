import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '@interfaces';
import { useCommunication, useCommunicationSubmit } from '@services';
import { MessageBlock, Screen, Header } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: g.size(-1),
    right: g.size(0),
  },
  buttonDisabled: {
    opacity: 0.5,
    position: 'absolute',
    bottom: g.size(-1),
    right: g.size(0),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    ...g.bodyMedium,
    color: g.black,
    backgroundColor: g.white,
    width: g.width * 0.8,
    alignSelf: 'center',
    borderRadius: g.size(20),
    paddingTop: g.size(8),
    paddingBottom: g.size(4),
    paddingHorizontal: g.size(16),
  },
  inputContainer: {
    position: 'absolute',
    width: g.width * 0.9,
    bottom: g.size(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: g.white,
    borderRadius: g.size(20),
    minHeight: g.size(36),
  },
  scroll: {
    width: '100%',
    paddingHorizontal: g.size(20),
    marginBottom: g.size(80),
  },
  scrollContent: {
    gap: g.size(16),
    paddingBottom: g.size(32),
  },
});

export default function Messages() {
  const [message, setMessage] = useState<string>('');
  const [size, setSize] = useState<number>(g.size(32));
  const { data: messages, refetch } = useCommunication();
  const { mutate: onMessageSubmit, isPending, isSuccess } = useCommunicationSubmit();

  const scrollViewRef = useRef<ScrollView>();
  const buttonDisabled = message.length === 0;
  const updateSize = (num: number) => {
    if (num > g.size(32) && num < g.size(500)) { setSize(num); }
  };

  useEffect(() => {
    if (!isSuccess) return;
    setMessage('');
    refetch();
    setSize(g.size(32));
    Keyboard.dismiss();
  }, [isSuccess]);

  return (
    <Screen>
      <Header />
      <KeyboardAvoidingView style={s.container} behavior="height">
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          contentContainerStyle={s.scrollContent}
          style={s.scroll}
        >
          {messages ? messages.map((mess: Message) => (
            <MessageBlock
              received={mess.resource.sender.type === 'Practitioner'}
              key={mess.resource.id}
              message={mess.resource.payload[0].contentString}
            />
          )) : <ActivityIndicator />}
        </ScrollView>
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
            textContentType="none"
            placeholderTextColor={g.neutral200}
            onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
          />
          {isPending ? (
            <ActivityIndicator size={g.size(39)} style={s.button} />
          )
            : (
              <TouchableOpacity
                onPress={() => onMessageSubmit(message)}
                disabled={buttonDisabled}
              >
                <Ionicons name="arrow-up-circle" size={g.size(36)} color={g.primaryBlue} style={buttonDisabled ? s.buttonDisabled : s.button} />
              </TouchableOpacity>
            )
          }
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
