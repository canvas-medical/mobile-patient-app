import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Animated,
  Easing,
  RefreshControl,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Message } from '@interfaces';
import { useCommunication, useCommunicationSubmit } from '@services';
import { useKeyboardVisible, useKeyboardHeight } from '@utils';
import { FlashListSeparator, Header, MessageBlock, ZeroState } from '@components';
import chat from '@assets/images/chat.svg';
import { g } from '@styles';

const s = StyleSheet.create({
  button: {
    width: g.ms(36),
    height: g.ms(36),
    borderRadius: g.ms(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: g.primaryBlue,
    borderWidth: g.ms(3),
    borderColor: g.neutral150,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: g.white,
    borderWidth: 1,
  },
  headerContainer: {
    zIndex: 1,
  },
  input: {
    ...g.bodyMedium,
    color: g.neutral800,
    backgroundColor: g.neutral150,
    width: g.width * 0.8,
    alignSelf: 'center',
    borderRadius: g.ms(50),
    paddingHorizontal: g.ms(16),
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -((g.width - g.ws(32)) / 2) }],
    width: g.width - g.ws(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: g.neutral150,
    borderRadius: g.ms(50),
    minHeight: g.hs(36),
    gap: g.ms(8),
  },
  keyboardDismissButton: {
    position: 'absolute',
    bottom: g.hs(20),
    left: g.ws(28),
  },
  loading: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: g.ws(20),
    paddingBottom: g.hs(36), // This is actually top padding due to the FlashList being inverted
  },
});

export default function Messages() {
  const keyboardVisible = useKeyboardVisible();
  const keyboardHeight = useKeyboardHeight();
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [size, setSize] = useState<number>(g.hs(32));
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useCommunication();
  const messages = useMemo(() => data?.pages?.flat()
    .filter((item: Message) => !!item?.payload)
    .sort((a: Message, b: Message) => {
      const aDate = new Date(a.sent || a.received);
      const bDate = new Date(b.sent || b.received);
      return bDate.getTime() - aDate.getTime();
    }) ?? [], [data]);
  const { mutate: onMessageSubmit, isPending, isSuccess } = useCommunicationSubmit();

  const flashListRef = useRef<FlashList<any>>();
  const submitDisabled = message.length === 0;
  const updateSize = (num: number) => {
    if (num > g.hs(32) && num < g.hs(500)) { setSize(num); }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
    setSize(g.hs(32));
    flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
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

  function inputBottomPositionSwitch() {
    switch (Platform.OS) {
      case 'ios':
        return (keyboardVisible && keyboardHeight > g.tabBarHeight ? keyboardHeight : g.tabBarHeight) + g.hs(16);
      case 'android':
        return keyboardVisible ? g.tabBarHeight + g.hs(40) : g.tabBarHeight + g.hs(16);
      default:
        return 0;
    }
  }
  function scrollBottomPaddingSwitch() {
    switch (Platform.OS) {
      case 'ios':
        return (keyboardVisible && keyboardHeight > g.tabBarHeight ? keyboardHeight : g.tabBarHeight) + g.hs(96);
      case 'android':
        return g.tabBarHeight + g.hs(96);
      default:
        return 0;
    }
  }

  return (
    <View style={s.container}>
      <View style={s.headerContainer}>
        <Header hideBackButton />
        <TouchableOpacity
          style={s.keyboardDismissButton}
          onPress={() => Keyboard.dismiss()}
          disabled={!keyboardVisible}
        >
          <Animated.View style={{ opacity: opacityValue }}>
            <MaterialIcons name="keyboard-hide" size={g.ms(40)} color={g.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {isLoading
        ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
        : (
          <>
            {messages.length ? (
              <FlashList
                ref={flashListRef}
                inverted
                data={messages}
                contentContainerStyle={{
                  ...s.scrollContent,
                  paddingTop: scrollBottomPaddingSwitch(), // This is actually bottom padding due to the FlashList being inverted
                }}
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
                    progressViewOffset={g.tabBarHeight + g.hs(72)}
                  />
                )}
                ItemSeparatorComponent={() => FlashListSeparator()}
                estimatedItemSize={g.hs(300)}
                onEndReached={() => {
                  if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={1}
                ListFooterComponent={isFetchingNextPage && (
                  <ActivityIndicator
                    size="large"
                    color={g.primaryBlue}
                    style={{ marginBottom: g.hs(20) }}
                  />
                )}
              />
            ) : (
              <ZeroState
                image={chat}
                imageAspectRatio={1}
                marginBottom={g.hs(60)}
                text="Send a message below to get started!"
              />
            )}
          </>
        )}
      <View
        style={[
          s.inputContainer,
          { bottom: inputBottomPositionSwitch() }
        ]}
      >
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
        <TouchableOpacity
          style={[s.button, submitDisabled && s.buttonDisabled]}
          onPress={() => {
            Keyboard.dismiss();
            onMessageSubmit(message);
          }}
          disabled={submitDisabled}
        >
          {isPending
            ? <ActivityIndicator size="small" style={s.button} color={g.white} />
            : <Ionicons name="arrow-up" size={g.ms(24)} color={g.white} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
