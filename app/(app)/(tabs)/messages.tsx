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
  Animated,
  Easing,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Message } from '@interfaces';
import { useCommunication, useCommunicationSubmit } from '@services';
import { useKeyboardVisible } from '@utils';
import { Header, MessageBlock, ZeroState } from '@components';
import chat from '@assets/images/chat.svg';
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
  chatContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: g.white,
  },
  headerContainer: {
    marginBottom: -g.size(8),
    zIndex: 1,
  },
  input: {
    ...g.bodyMedium,
    color: g.neutral800,
    backgroundColor: g.neutral200,
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
    width: g.width - g.size(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: g.neutral200,
    borderRadius: g.size(20),
    minHeight: g.size(36),
  },
  keyboardDismissButton: {
    position: 'absolute',
    bottom: g.size(20),
    left: g.size(28),
  },
  loading: {
    flex: 1,
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
  const keyboardVisible = useKeyboardVisible();
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [containerLayout, setContainerLayout] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [size, setSize] = useState<number>(g.size(32));
  const { data: messages, isLoading, refetch } = useCommunication();
  const { mutate: onMessageSubmit, isPending, isSuccess } = useCommunicationSubmit();

  const scrollViewRef = useRef<ScrollView>();
  const buttonDisabled = message.length === 0;
  const updateSize = (num: number) => {
    if (num > g.size(32) && num < g.size(500)) { setSize(num); }
  };

  useEffect(() => {
    // Setting messages to refetch every 30 seconds when the user is on the messaging screen
    const interval = setInterval(refetch, 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef?.current?.scrollToEnd();
    }, [])
  );

  useEffect(() => {
    if (!isSuccess) return;
    setMessage('');
    refetch();
    setSize(g.size(32));
    Keyboard.dismiss();
  }, [isSuccess]);

  function toggleKeyBoard() {
    Animated.timing(opacityValue, {
      toValue: keyboardVisible ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    toggleKeyBoard();
  }, [keyboardVisible]);

  return (
    <View style={[s.container, { paddingBottom: tabBarHeight }]}>
      <View style={s.headerContainer}>
        <Header hideBackButton />
        <TouchableOpacity
          style={s.keyboardDismissButton}
          onPress={() => Keyboard.dismiss()}
          disabled={!keyboardVisible}
        >
          <Animated.View style={{ opacity: opacityValue }}>
            <MaterialIcons name="keyboard-hide" size={g.size(40)} color={g.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={s.chatContainer}
        behavior="height"
      >
        {isLoading
          ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
          : (
            <>
              {
                messages.length ? (
                  <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={s.scrollContent}
                    onLayout={({ nativeEvent: { layout } }) => {
                      if (layout.height < containerLayout) scrollViewRef.current.scrollToEnd({ animated: true });
                      setContainerLayout(layout.height);
                    }}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                  >
                    {messages.map((mess: Message) => (
                      <MessageBlock
                        received={mess.resource.sender.type === 'Practitioner'}
                        key={mess.resource.id}
                        message={mess.resource?.payload && mess.resource.payload[0]?.contentString}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <ZeroState
                    image={chat}
                    imageAspectRatio={1}
                    marginBottom={g.size(60)}
                    text="Send a message below to get started!"
                  />
                )
              }
            </>
          )}
        <View style={s.inputContainer}>
          <TextInput
            style={{ ...s.input, height: size }}
            multiline
            placeholder="Message here..."
            value={message}
            onChange={(e) => setMessage(e.nativeEvent.text)}
            onFocus={() => null}
            autoCapitalize="sentences"
            keyboardType="default"
            textContentType="none"
            placeholderTextColor={g.neutral400}
            onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
          />
          {isPending
            ? <ActivityIndicator size={g.size(39)} style={s.button} color={g.primaryBlue} />
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
    </View>
  );
}
