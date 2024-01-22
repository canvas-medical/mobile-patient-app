import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
  Easing,
  Platform,
  RefreshControl,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Message } from '@interfaces';
import { useCommunication, useCommunicationSubmit } from '@services';
import { useKeyboardVisible } from '@utils';
import { FlashListSeparator, Header, MessageBlock, ZeroState } from '@components';
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
    backgroundColor: g.neutral150,
    width: g.width * 0.8,
    alignSelf: 'center',
    borderRadius: g.size(20),
    paddingTop: g.size(8),
    paddingBottom: g.size(4),
    paddingHorizontal: g.size(16),
  },
  inputContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? g.size(20) : g.size(40),
    left: '50%',
    transform: [{ translateX: -((g.width - g.size(32)) / 2) }],
    width: g.width - g.size(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: g.neutral150,
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
    paddingHorizontal: g.size(20),
    paddingTop: g.size(72), // This is actually bottom padding due to the FlashList being inverted
    paddingBottom: g.size(36), // This is actually top padding due to the FlashList being inverted
  },
});

export default function Messages() {
  const tabBarHeight = useBottomTabBarHeight();
  const keyboardVisible = useKeyboardVisible();
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [size, setSize] = useState<number>(g.size(32));
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useCommunication();
  const messages = useMemo(() => (data?.pages?.flat().sort((a: Message, b: Message) => {
    const aDate = new Date(a.sent || a.received);
    const bDate = new Date(b.sent || b.received);
    return bDate.getTime() - aDate.getTime();
  })) ?? [], [data]);
  const { mutate: onMessageSubmit, isPending, isSuccess } = useCommunicationSubmit();

  const flashListRef = useRef<FlashList<any>>();
  const buttonDisabled = message.length === 0;
  const updateSize = (num: number) => {
    if (num > g.size(32) && num < g.size(500)) { setSize(num); }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log('Hello: ', messages.length);

  useEffect(() => {
    if (hasNextPage && messages.length) {
      fetchNextPage();
      flashListRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  }, [hasNextPage, messages.length]);

  useEffect(() => {
    // Setting messages to refetch every 30 seconds when the user is on the messaging screen
    const interval = setInterval(refetch, 30 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    setMessage('');
    refetch();
    setSize(g.size(32));
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
              {messages.length ? (
                <FlashList
                  ref={flashListRef}
                  inverted
                  data={messages}
                  contentContainerStyle={s.scrollContent}
                  renderItem={({ item }) => (
                    <MessageBlock
                      received={item.sender.type === 'Practitioner'}
                      key={item.id}
                      message={item?.payload && item.payload[0]?.contentString}
                      sentTime={item.sent}
                    />
                  )}
                  refreshControl={(
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      tintColor={g.primaryBlue}
                      colors={[g.primaryBlue]}
                      progressViewOffset={tabBarHeight}
                    />
                  )}
                  ItemSeparatorComponent={() => FlashListSeparator()}
                  estimatedItemSize={g.size(150)}
                  onEndReached={() => {
                    if (hasNextPage) fetchNextPage();
                  }}
                  onEndReachedThreshold={1}
                  ListFooterComponent={isFetchingNextPage && (
                    <ActivityIndicator
                      size="large"
                      color={g.primaryBlue}
                      style={{ marginBottom: g.size(20) }}
                    />
                  )}
                />
              ) : (
                <ZeroState
                  image={chat}
                  imageAspectRatio={1}
                  marginBottom={g.size(60)}
                  text="Send a message below to get started!"
                />
              )}
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
                onPress={() => {
                  Keyboard.dismiss();
                  onMessageSubmit(message);
                }}
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
