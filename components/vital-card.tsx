import { StyleSheet, Text, View } from 'react-native';
import { BlurFill } from '@components';
import { Vital } from '@interfaces';
import { vitalsValueSwitch, vitalsIconSwitch, formatDate } from '@utils';
import { g } from '@styles';

const s = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
    gap: g.size(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: (g.width - g.size(48)) / 2,
    borderRadius: g.size(8),
    overflow: 'hidden',
    padding: g.size(8),
    justifyContent: 'space-between',
  },
  firstBlurContainer: {
    width: '100%',
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    gap: g.size(8),
    justifyContent: 'space-between',
    marginBottom: g.size(8),
  },
  vitalData: {
    ...g.labelMedium,
    color: g.white,
  },
  vitalDate: {
    ...g.bodySmall,
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
  const {
    issued = '',
    code: { coding = [{ display: '' }] } = {}
  } = vital ?? {};

  return (
    <View
      style={[
        s.card,
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
          {formatDate(issued)}
        </Text>
        <Text style={s.vitalData}>
          {vitalsValueSwitch(coding[0].display, vital)}
        </Text>
      </View>
    </View>
  );
}

export function VitalCardSkeleton() {
  return (
    <View style={[s.card, { height: g.size(48) }]}>
      <BlurFill />
    </View>
  );
}
