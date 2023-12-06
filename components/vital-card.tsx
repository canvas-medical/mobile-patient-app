import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Vital } from '@interfaces';
import { vitalsValueSwitch, vitalsIconSwitch } from '@utils';
import { g } from '@styles';

const s = StyleSheet.create({
  blurContainer: {
    width: (g.width - g.size(48)) / 2,
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: g.size(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: g.size(8),
  },
  firstBlurContainer: {
    width: g.width - g.size(32),
  },
  topRow: {
    flexDirection: 'row',
    gap: g.size(8),
    justifyContent: 'space-between',
  },
  vitalBlur: {
    flex: 1,
    padding: g.size(12),
    justifyContent: 'space-between',
  },
  vitalData: {
    ...g.labelMedium,
    color: g.white,
  },
  vitalDate: {
    ...g.labelSmall,
    color: g.white,
  },
  vitalLabel: {
    flex: 1,
    ...g.labelMedium,
    color: g.white,
  },
});

export function VitalCard({ vital, vitalsOdd, index }: {
  vital: Vital,
  vitalsOdd: boolean,
  index: number,
}) {
  const { issued, code: { coding } } = vital;
  console.log(`${coding[0].display}`, vital);
  return (
    <View
      style={[
        s.blurContainer,
        index === 0 && vitalsOdd && s.firstBlurContainer
      ]}
    >
      <BlurView
        style={s.vitalBlur}
        tint="light"
        intensity={50}
      >
        <View style={s.topRow}>
          <Text style={s.vitalLabel}>
            {coding[0].display}
          </Text>
          {vitalsIconSwitch(coding[0].display)}
        </View>
        <View style={s.bottomRow}>
          <Text style={s.vitalDate}>
            {new Date(issued).toLocaleDateString('en-US', {
              year: '2-digit',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
          <Text style={s.vitalData}>
            {vitalsValueSwitch(coding[0].display, vital)}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}
