import { StyleSheet, Text, View } from 'react-native';
import { BlurFill } from '@components';
import { Vital } from '@interfaces';
import { vitalsValueSwitch, vitalsIconSwitch } from '@utils';
import { g } from '@styles';

const s = StyleSheet.create({
  blurContainer: {
    width: (g.width - g.size(48)) / 2,
    borderRadius: g.size(8),
    overflow: 'hidden',
    padding: g.size(8),
    paddingBottom: g.size(32),
  },
  bottomRow: {
    position: 'absolute',
    bottom: g.size(8),
    left: g.size(8),
    flexDirection: 'row',
    gap: g.size(8),
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  firstBlurContainer: {
    width: g.width - g.size(32),
  },
  topRow: {
    flexDirection: 'row',
    gap: g.size(8),
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
  return (
    <View
      style={[
        s.blurContainer,
        index === 0 && vitalsOdd && s.firstBlurContainer,
      ]}
    >
      <BlurFill />
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

    </View>
  );
}

export function VitalCardSkeleton({ vitalsOdd, index }) {
  return (
    <View
      style={[
        s.blurContainer,
        index === 0 && vitalsOdd && s.firstBlurContainer,
        { height: g.size(48) }
      ]}
    >
      <BlurFill />
    </View>
  );
}
