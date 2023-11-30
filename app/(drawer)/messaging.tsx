import {
  ActivityIndicator,
  StyleSheet, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Keyboard,
} from 'react-native';
import { g } from '@styles';
import { MessageBlock, Screen, Header } from '@components';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  useCommunication, useCommunicationSubmit,
} from '@services';
import { Message } from '@interfaces/message';

const s = StyleSheet.create({
  container: {
    paddingHorizontal: g.size(32),
    height: g.height - g.size(140), // subtract header height
    alignItems: 'center',
    gap: g.size(16),
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
    bottom: g.size(36),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: g.white,
    borderRadius: g.size(25),
  },
  scroll: {
    width: '100%',
    gap: g.size(16),
    paddingBottom: g.size(32),
    marginBottom: g.size(80),
  },
});

export default function Messaging() {
  const [message, setMessage] = useState<string>('');
  const [size, setSize] = useState<number>(32);
  const { data: messages, refetch } = useCommunication();
  const { mutate: onMessageSubmit, isPending, isSuccess } = useCommunicationSubmit();

  const scrollViewRef = useRef();
  const buttonDisabled = message.length === 0;
  const updateSize = (num: number) => {
    if (num > 32 && num < 500) { setSize(num); }
  };

  useEffect(() => {
    if (!isSuccess) return;
    setMessage('');
    refetch();
    setSize(32);
    Keyboard.dismiss();
  }, [isSuccess]);

  return (
    <Screen>
      <Header />
      <KeyboardAvoidingView style={s.container} behavior="height">
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          contentContainerStyle={s.scroll}
          style={s.scroll}
        >
          {messages
            ? messages.map((mess: Message) =>
              (
                <MessageBlock
                  received={mess.resource.sender.type === 'Practitioner'}
                  key={mess.resource.id}
                  message={mess.resource.payload[0].contentString}
                />
              ))
            : <ActivityIndicator />}
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
            <ActivityIndicator size={g.size(39)} />
          )
            : (
              <TouchableOpacity
                onPress={() => onMessageSubmit(message)}
                disabled={buttonDisabled}
              >
                <Ionicons name="arrow-up-circle" size={g.size(36)} color={g.primaryBlue} style={{ opacity: buttonDisabled && 0.5 }} />
              </TouchableOpacity>
            )
        }
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
