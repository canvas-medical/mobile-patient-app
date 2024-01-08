/* eslint-disable react/jsx-no-useless-fragment */
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
import MaskedView from '@react-native-masked-view/masked-view';
import { useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Message } from '@interfaces';
import { useCommunication, useCommunicationSubmit } from '@services';
import { useKeyboardVisible } from '@utils';
import { MessageBlock, Screen, ZeroState } from '@components';
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
  container: {
    flex: 1,
  },
  headerContainer: {
    height: g.size(112),
    paddingBottom: g.size(12),
    paddingRight: g.size(24),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
    width: g.width - g.size(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: g.white,
    borderRadius: g.size(20),
    minHeight: g.size(36),
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
    <Screen style={{ paddingBottom: tabBarHeight }}>
      <View style={s.headerContainer}>
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          disabled={!keyboardVisible}
        >
          <Animated.View style={{ opacity: opacityValue }}>
            <MaterialIcons name="keyboard-hide" size={g.size(40)} color={g.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>
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
          {isLoading
            ? <ActivityIndicator size="large" color={g.white} style={s.loading} />
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
                          message={mess.resource.payload[0].contentString}
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
              placeholderTextColor={g.neutral200}
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
        </MaskedView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
