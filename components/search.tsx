import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableBlur } from '@ui';
import { g } from '@styles';

const s = StyleSheet.create({
  searchButton: {
    padding: g.size(4),
    borderRadius: g.size(4),
  },
});

export function Search() {
  return (
    <TouchableBlur
      onPress={() => null}
      style={s.searchButton}
      intensity={40}
    >
      <Feather name="search" size={g.size(24)} color={g.white} />
    </TouchableBlur>
  );
}
