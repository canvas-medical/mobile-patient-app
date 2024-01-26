import { StyleSheet, Text, View } from 'react-native';
import { Vital } from '@interfaces';
import { vitalsValueSwitch, vitalsIconSwitch, formatDate } from '@utils';
import { g } from '@styles';

const s = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
    gap: g.ms(8),
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  card: {
    backgroundColor: g.white,
    width: (g.width - g.ws(48)) / 2,
    borderRadius: g.ms(6),
    padding: g.ms(8),
    justifyContent: 'space-between',
    ...g.cardShadow,
  },
  firstBlurContainer: {
    width: '100%',
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    gap: g.ms(8),
    justifyContent: 'space-between',
    marginBottom: g.hs(8),
  },
  vitalData: {
    ...g.labelMedium,
    flexShrink: 1,
    color: g.neutral900,
    flexWrap: 'wrap',
  },
  vitalDate: {
    ...g.bodySmall,
    color: g.neutral600,
  },
  vitalLabel: {
    flex: 1,
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
      <View style={s.topRow}>
        <Text style={[s.vitalData, s.vitalLabel]}>
          {coding[0].display}
        </Text>
        {vitalsIconSwitch(coding[0].display)}
      </View>
      <View style={s.bottomRow}>
        <Text style={s.vitalDate}>
          {formatDate(issued, { year: '2-digit', month: 'numeric', day: 'numeric' })}
        </Text>
        <Text
          numberOfLines={3}
          style={s.vitalData}
        >
          {vitalsValueSwitch(coding[0].display, vital)}
        </Text>
      </View>
    </View>
  );
}

export function VitalCardSkeleton() {
  return <View style={[s.card, { height: g.hs(60) }]} />;
}
