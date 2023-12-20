import { useState } from 'react';
import {
  StyleSheet, View, Text, Pressable, Alert, Platform
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LightbulbOnSVG } from '@components';
import { Condition } from '@interfaces';
import * as Haptics from 'expo-haptics';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardBlur: {
    paddingHorizontal: g.size(16),
    paddingVertical: g.size(12),
  },
  condition: {
    ...g.labelMedium,
    color: g.white,
  },
  conditionDate: {
    ...g.labelSmall,
    color: g.white,
    alignSelf: 'flex-end',
  },
  conditionInfoContainer: {
    gap: g.size(8),
  },
});

export function ConditionCard({ condition }: { condition: Condition }) {
  const [isPressed, setIsPressed] = useState(false);

  const {
    code: { text },
    recordedDate,
  } = condition;

  return (
    <Pressable
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onLongPress={() => {
        Alert.alert('AI stuff will appear here');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => console.log('Haptic error'));
      }}
      style={s.card}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={s.cardBlur}
      >
        <View style={s.conditionInfoContainer}>
          <Text style={s.condition}>
            {text}
          </Text>
          <LightbulbOnSVG
            lightbulbOn={isPressed}
            color={g.white}
            width={g.size(25)}
            height={g.size(25)}
          />
          <Text style={s.conditionDate}>
            {new Date(recordedDate).toLocaleDateString()}
          </Text>

        </View>
      </BlurView>
    </Pressable>
  );
}
