import { useCallback, useEffect, useRef, useState } from 'react';
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
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaskedView from '@react-native-masked-view/masked-view';
import { useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '@interfaces';
import { useCommunication, useCommunicationSubmit } from '@services';
import { MessageBlock, Screen, Header } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: g.size(-1),
    right: 0,
  },
  buttonDisabled: {
    opacity: 0.5,
    position: 'absolute',
    bottom: g.size(-1),
    right: 0,
  },
  container: {
    flex: 1,
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
    bottom: g.size(20),
    left: '50%',
    transform: [{ translateX: -((g.width - g.size(32)) / 2) }],
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: g.white,
    borderRadius: g.size(20),
    minHeight: g.size(36),
    flexGrow: 1,
    width: g.width - g.size(32),
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: g.size(36),
    paddingHorizontal: g.size(20),
    paddingBottom: g.size(96),
    gap: g.size(16),
  },
});

export default function Messages() {
  const tabBarHeight = useBottomTabBarHeight();
  const [containerLayout, setContainerLayout] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [size, setSize] = useState<number>(g.size(32));
  const { data: messages, refetch } = useCommunication();
  const { mutate: onMessageSubmit, isPending, isSuccess } = useCommunicationSubmit();

  const scrollViewRef = useRef<ScrollView>();
  const buttonDisabled = message.length === 0;
  const updateSize = (num: number) => {
    if (num > g.size(32) && num < g.size(500)) { setSize(num); }
  };

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current.scrollToEnd();
    }, [])
  );

  useEffect(() => {
    if (!isSuccess) return;
    setMessage('');
    refetch();
    setSize(g.size(32));
    Keyboard.dismiss();
  }, [isSuccess]);

  return (
    <Screen style={{ paddingBottom: tabBarHeight }}>
      <Header />
      <KeyboardAvoidingView
        style={s.container}
        behavior="height"
      >
        <MaskedView
          style={s.container}
          maskElement={(
            <LinearGradient
              style={s.container}
              colors={[g.transparent, g.white]}
              locations={[0, 0.065]}
            />
          )}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={s.scrollContent}
            onLayout={({ nativeEvent: { layout } }) => {
              if (layout.height < containerLayout) scrollViewRef.current.scrollToEnd({ animated: true });
              setContainerLayout(layout.height);
            }}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
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
        </MaskedView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
