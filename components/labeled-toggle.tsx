import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: g.size(1),
    borderBottomColor: g.white,
    borderBottomStyle: 'solid',
  },
  indicator: {
    width: '100%',
    height: g.size(4),
    backgroundColor: g.white,
    borderTopEndRadius: g.size(4),
    borderTopStartRadius: g.size(4),
  },
  label: {
    ...g.labelMedium,
    color: g.white,
    paddingHorizontal: g.size(4),
    marginBottom: g.size(8),
  },
  labelInactive: {
    opacity: 0.75,
  },
});

interface Props {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  optionOne: string;
  optionTwo: string;
}

export function LabeledToggle(props: Props) {
  const { toggled, setToggled, optionOne, optionTwo } = props;
  return (
    <View style={s.container}>
      <TouchableOpacity
        onPress={() => setToggled(false)}
      >
        <Text style={[s.label, toggled && s.labelInactive]}>
          {optionOne}
        </Text>
        {!toggled && <View style={s.indicator} />}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setToggled(true)}
      >
        <Text style={[s.label, !toggled && s.labelInactive]}>
          {optionTwo}
        </Text>
        {toggled && <View style={s.indicator} />}
      </TouchableOpacity>
    </View>
  );
}
