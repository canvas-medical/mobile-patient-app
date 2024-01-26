import { View } from 'react-native';
import { g } from '@styles';

export function FlashListSeparator(height: number = 16) {
  return <View style={{ height: g.hs(height) }} />;
}
