import { ReactNode, useState } from 'react';
import { Pressable, StyleProp } from 'react-native';
import { LightbulbOnSVG, AiModal } from '@components';
import * as Haptics from 'expo-haptics';
import { g } from '@styles';

export function ExplainButton({
  id, resourceType, codes, description, children, style,
}: { id: string, resourceType: string, codes: [{code: string, system: string, display: string}], description: string, children: ReactNode, style?: StyleProp<any>}) {
  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(codes, description);
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
