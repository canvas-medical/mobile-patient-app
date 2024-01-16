/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet } from 'react-native';
import { g } from '@styles';

// TODO: This change is temporary, this components getting removed

export function BlurFill() {
  return <View style={[StyleSheet.absoluteFill, { backgroundColor: g.primaryBlue, opacity: 0.1 }]} />;
}
