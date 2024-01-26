import { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    backgroundColor: g.white,
    paddingVertical: g.hs(12),
    paddingHorizontal: g.ms(16),
    gap: g.hs(4),
    borderRadius: g.ms(6),
    ...g.cardShadow,
  },
  skeleton: {
    height: g.hs(48),
  },
});

export function CardContainer({
  children,
  onPress,
  skeleton,
}: {
  children?: ReactNode,
  onPress?: () => void,
  skeleton?: boolean,
}) {
  if (onPress) {
    return (
      <TouchableOpacity
        style={s.card}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={[s.card, skeleton && s.skeleton]}>
      {children}
    </View>
  );
}
