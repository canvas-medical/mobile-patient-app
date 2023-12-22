import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { g } from '@styles';

const s = StyleSheet.create({
  searchButton: {
    borderRadius: g.size(4),
    overflow: 'hidden',
  },
});

export function Search() {
  return (
    <TouchableOpacity
      onPress={() => null}
      style={s.searchButton}
    >
      <Feather name="search" size={g.size(24)} color={g.white} />
    </TouchableOpacity>
  );
}
