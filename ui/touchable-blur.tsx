/* eslint-disable react-native/no-inline-styles */
import { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, View } from 'react-native';
import { BlurView as Blur } from 'expo-blur';

interface Props {
  children: ReactNode,
  onPress: () => void,
  intensity: number,
  style: StyleProp<any>,
}

export function TouchableBlur(props: Props) {
  const { children, onPress, intensity, style } = props;
  const margins = Object.entries(style).filter(([key]) => key.includes('margin')).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  const padding = Object.entries(style).filter(([key]) => key.includes('padding')).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  const contentContainerStyles = Object.entries(style)
    .filter(([key]) => (!key.includes('padding')) && !key.includes('margin') && key !== 'borderRadius')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        overflow: 'hidden',
        borderRadius: style.borderRadius,
        ...margins,
      }}
    >
      <Blur
        tint="light"
        intensity={intensity}
        style={padding}
      >
        <View style={contentContainerStyles}>
          {children}
        </View>
      </Blur>
    </TouchableOpacity>
  );
}
