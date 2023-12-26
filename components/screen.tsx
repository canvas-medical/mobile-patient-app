import { ReactNode } from 'react';
import { StyleSheet, StyleProp, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import blurs from '@assets/images/blurs.png';
import { g } from '@styles';

const s = StyleSheet.create({
  blurCircles: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.size(200),
    height: g.size(200),
  },
  container: {
    flex: 1,
  },
});

interface Props {
  children?: ReactNode,
  style?: StyleProp<any>,
}

export function Screen({ children, style }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        style={[s.container, style]}
        colors={[g.primaryBlue, g.secondaryBlue]}
      >
        <StatusBar style="light" />
        <Image
          style={s.blurCircles}
          source={blurs}
        />
        {children}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
