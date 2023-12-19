import {
  Text, StyleSheet, TouchableWithoutFeedback, View, Pressable, ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';
import { g } from '@styles';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LightbulbOnSVG } from '@components/lightbulb-on-svg';
import { useState } from 'react';
import { LightbulbSVG } from '@components/lightbulb-svg';

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
  },
  cardBlur: {
    padding: g.size(16),
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: g.white,
    padding: g.size(16),
    paddingBottom: g.size(32),
    borderBottomRightRadius: g.size(16),
    borderBottomLeftRadius: g.size(16),
  },
  header: {
    ...g.titleSmall,
    color: g.white,
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
  text: {
    ...g.bodyMedium,
    color: g.white,
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

export function AiWelcomeWizard({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: (boolean) => void}) {
  const [isPressed, setIsPressed] = useState(false);
  const [swapModals, setSwapModals] = useState(false);

  return (
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
      {!swapModals
        ? (
          <Pressable
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onLongPress={() => {
              setSwapModals(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => console.log('Haptic error'));
            }}
            style={s.card}
          >
            <BlurView
              intensity={40}
              tint="light"
              style={s.cardBlur}
            >
              <Text style={s.header}>Welcome to Your Health App</Text>
              <View style={s.textContainer}>
                <Text style={s.text}>Look for this icon</Text>
                <LightbulbSVG fill={g.transparent} width={g.size(25)} height={g.size(25)} />
                <Text style={s.text}>Press on the card until it changes to this</Text>
                <LightbulbSVG fill={g.goldenYellow} width={g.size(25)} height={g.size(25)} />
                <Text style={s.text}>Doing so will reveal detailed AI-generated insights about your health information. Give it a try now by pressing on this popup until the lightbulb in the upper right turns on!</Text>
              </View>
            </BlurView>
            <LightbulbOnSVG
              lightbulbOn={isPressed}
              color={g.white}
              width={g.size(25)}
              height={g.size(25)}
            />
          </Pressable>
        )
        : (
          <>
            <View style={s.headerContainer}>
              <FontAwesome name="lightbulb-o" size={24} color={g.goldenYellow} />
              <Text style={s.header}>Explain</Text>
            </View>
            <View style={s.container}>
              <Text style={s.blueText}>Great job! You've unlocked AI insights. Tap anywhere outside of this popup to close.</Text>
            </View>
          </>
        )
       }
    </Modal>
  );
}
