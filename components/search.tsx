import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { g } from '@styles';
import { BlurView } from 'expo-blur';

const s = StyleSheet.create({
  searchButton: {
    borderRadius: g.size(4),
    overflow: 'hidden',
  },
  searchButtonBlur: {
    padding: g.size(4),
  },
});

export function Search() {
  return (
    <TouchableOpacity
      onPress={() => null}
      style={s.searchButton}
    >
      <BlurView
        style={s.searchButtonBlur}
        tint="light"
        intensity={40}
      >
        <Feather name="search" size={g.size(24)} color={g.white} />
      </BlurView>
    </TouchableOpacity>
  );
}
