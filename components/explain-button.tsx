import { ReactNode, useState } from 'react';
import { Pressable, StyleProp } from 'react-native';
import { LightbulbOnSVG, AiModal } from '@components';
import * as Haptics from 'expo-haptics';
import { g } from '@styles';

interface ExplainButtonProps {
    id: string,
    resourceType: string,
    codes: [{code: string, system: string, display: string}],
    description: string,
    children: ReactNode,
    style?: StyleProp<any>
}

export function ExplainButton({
  id, resourceType, codes, description, children, style
}: ExplainButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      onLongPress={() => {
        setModalVisible(true);
        setIsPressed(false);
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
      {modalVisible
      && (
      <AiModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        resourceType={resourceType}
        codes={codes}
        description={description}
      />
      )}
      {children}
    </Pressable>
  );
}
