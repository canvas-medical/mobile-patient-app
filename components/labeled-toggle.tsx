import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from '@ui';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: g.size(50),
    marginVertical: g.size(12),
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
}

export function LabeledToggle(props: Props) {
  const { toggled, setToggled } = props;
  return (
    <BlurView
      intensity={40}
      style={s.container}
    >
      <View style={s.toggleButtonContainer}>
        <TouchableOpacity
          style={[s.toggleButton, !toggled && s.toggleButtonActive]}
          onPress={() => setToggled(false)}
        >
          <Text style={[s.toggleLabel, !toggled && s.toggleLabelActive]}>
            Lab Results
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.toggleButton, toggled && s.toggleButtonActive]}
          onPress={() => setToggled(true)}
        >
          <Text style={[s.toggleLabel, toggled && s.toggleLabelActive]}>
            Medications
          </Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}
