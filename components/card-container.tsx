import { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    backgroundColor: g.white,
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
    borderRadius: g.size(6),
    ...g.cardShadow,
  },
  skeleton: {
    height: g.size(48),
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
