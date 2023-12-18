import { useState } from 'react';
import { Pressable } from 'react-native';
import { LightbulbOnSVG, AiModal } from '@components';
import * as Haptics from 'expo-haptics';
import { g } from '@styles';

export function ExplainButton({ json, children, style }) {
  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onLongPress={() => {
        setModalVisible(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => console.log('Haptic error'));
      }}
      style={style}
    >
      <LightbulbOnSVG
        lightbulbOn={isPressed}
        color={g.white}
        width={g.size(25)}
        height={g.size(25)}
      />
      <AiModal modalVisible={modalVisible} setModalVisible={setModalVisible} json={json} />
      {children}
    </Pressable>
  );
}
