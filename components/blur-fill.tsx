import { Platform, View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { g } from '@styles';

export function BlurFill({ intensity }: {intensity?: number}) {
  if (Platform.OS === 'ios') return <BlurView intensity={intensity || 40} style={StyleSheet.absoluteFill} />;
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: g.white, opacity: 0.4 }]} />;
}
