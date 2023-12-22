/* eslint-disable react-native/no-inline-styles */
import { Platform, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { g } from '@styles';

export function BlurFill({ intensity = 40, opacity = 0.4 }: { intensity?: number; opacity?: number }) {
  if (Platform.OS === 'ios') return <BlurView tint="light" intensity={intensity} style={StyleSheet.absoluteFill} />;
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: g.white, opacity }]} />;
}
