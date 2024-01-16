import { ReactNode } from 'react';
import { StyleSheet, StyleProp } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.8,
    aspectRatio: 59 / 77,
  },
});

interface Props {
  children?: ReactNode,
  style?: StyleProp<any>,
}

export function Screen({ children, style }: Props) {
  return (
    <LinearGradient
      style={[s.container, style]}
      colors={[g.primaryBlue, g.secondaryBlue]}
    >
      <StatusBar style="light" />
      <Image
        style={s.graphic}
        source={graphic}
      />
      {children}
    </LinearGradient>
  );
}
