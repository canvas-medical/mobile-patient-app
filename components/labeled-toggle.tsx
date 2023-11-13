import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    // ...g.shadow,
    width: '100%',
    marginVertical: g.size(12),
  },
  toggle: {
    overflow: 'hidden',
    borderRadius: g.size(50),
  },
  toggleButton: {
    borderRadius: g.size(50),
    padding: g.size(12),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  toggleButtonActive: {
    backgroundColor: g.white,
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    padding: g.size(4),
    gap: g.size(8),
  },
  toggleLabel: {
    ...g.labelSmall,
    color: g.white,
  },
  toggleLabelActive: {
    color: g.secondaryBlue,
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
      <View style={s.toggle}>
        <BlurView
          intensity={40}
          tint="light"
        >
          <View style={s.toggleButtonContainer}>
            <TouchableOpacity
              style={[s.toggleButton, !toggled && s.toggleButtonActive]}
              onPress={() => setToggled(false)}
            >
              <Text style={[s.toggleLabel, !toggled && s.toggleLabelActive]}>
                {optionOne}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.toggleButton, toggled && s.toggleButtonActive]}
              onPress={() => setToggled(true)}
            >
              <Text style={[s.toggleLabel, toggled && s.toggleLabelActive]}>
                {optionTwo}
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </View>
  );
}
