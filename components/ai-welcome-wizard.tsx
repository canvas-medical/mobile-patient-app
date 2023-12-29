import { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Pressable,
  Platform,
} from 'react-native';
import Animated, { FadeInUp, FadeOut, FadeOutDown } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LightbulbOnSVG } from '@components/lightbulb-on-svg';
import { LightbulbSVG } from '@components/lightbulb-svg';
import { BlurFill } from '@components/blur-fill';
import { g } from '@styles';

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.8,
  },
  blueText: {
    ...g.bodyMedium,
    color: g.secondaryBlue,
    textAlign: 'center',
    paddingTop: g.size(8),
  },
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    padding: g.size(16),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: g.size(16),
    backgroundColor: g.white,
    paddingBottom: g.size(32),
    borderBottomRightRadius: g.size(16),
    borderBottomLeftRadius: g.size(16),
  },
  header: {
    ...g.titleSmall,
    color: Platform.OS === 'ios' ? g.white : g.black,
    textAlign: 'left',
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
  secondModalHeader: {
    ...g.titleSmall,
    color: g.white,
    textAlign: 'left',
  },
  text: {
    ...g.bodyMedium,
    color: Platform.OS === 'ios' ? g.white : g.black,
    textAlign: 'left',
    paddingTop: g.size(8),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: g.size(16),
    paddingLeft: 0,
  },
});

export function AiWelcomeWizard({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: (arg: boolean) => void }) {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [swapModals, setSwapModals] = useState<boolean>(false);

  return (
    <View>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={modalVisible}
        swipeDirection="right"
        onSwipeComplete={() => setModalVisible(false)}
        customBackdrop={(
          <TouchableWithoutFeedback onPress={() => swapModals && setModalVisible(false)}>
            <View style={s.backdrop} />
          </TouchableWithoutFeedback>
        )}
      >
        {!swapModals ? (
          <Animated.View exiting={FadeOutDown}>
            <Pressable
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
              onLongPress={() => {
                setSwapModals(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => console.log('Haptic error'));
              }}
              style={s.card}
            >
              <BlurFill opacity={1} />
              <Text style={s.header}>Welcome to Your Health App</Text>
              <View style={s.textContainer}>
                <Text style={s.text}>Look for this icon</Text>
                <LightbulbSVG
                  initialFill={Platform.OS === 'ios' ? g.white : g.neutral500}
                  fill={g.transparent}
                  width={g.size(25)}
                  height={g.size(25)}
                />
                <Text style={s.text}>Press on the lightbulb until it changes to this</Text>
                <LightbulbSVG
                  fill={g.goldenYellow}
                  width={g.size(25)}
                  height={g.size(25)}
                />
                <Text style={s.text}>
                  Doing so will reveal detailed AI-generated insights about your health information.
                  Give it a try now by pressing on this popup until the lightbulb in the upper right turns on!
                </Text>
              </View>
              <LightbulbOnSVG
                lightbulbOn={isPressed}
                color={(Platform.OS === 'ios' || isPressed) ? g.white : g.neutral500}
                width={g.size(25)}
                height={g.size(25)}
              />
            </Pressable>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeInUp} exiting={FadeOut}>
            <View style={s.headerContainer}>
              <FontAwesome name="lightbulb-o" size={24} color={g.goldenYellow} />
              <Text style={s.secondModalHeader}>Explain</Text>
            </View>
            <View style={s.container}>
              <Text style={s.blueText}>Great job! You&apos;ve unlocked AI insights. Tap anywhere outside of this popup to close.</Text>
            </View>
          </Animated.View>
        )}
      </Modal>
    </View>
  );
}
