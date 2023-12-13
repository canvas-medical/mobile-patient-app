import { StyleSheet, Text, View } from 'react-native';
import { Vital } from '@interfaces';
import { VitalCard } from '@components/vital-card'; // TODO - Revisit this to prevent circular dependency and excessive imports
import { g } from '@styles';
import { FontAwesome5 } from '@expo/vector-icons';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(8),
  },
  sectionContainer: {
    flex: 1,
    gap: g.size(16),
  },
  vitalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: g.size(16),
    justifyContent: 'space-between',
  },
});

export function VitalsGrid({ vitals }: { vitals: Vital[] }) {
  return (
    <View style={s.sectionContainer}>
      <View style={s.labelContainer}>
        <FontAwesome5 name="heartbeat" size={20} color={g.white} />
        <Text style={s.label}>
          Vitals
        </Text>
      </View>
      <View style={s.vitalsContainer}>
        {vitals.map((vital, i) => (
          <VitalCard
            index={i}
            key={vital.id}
            vital={vital}
            vitalsOdd={vitals.length % 2 !== 0}
          />
        ))}
      </View>
    </View>
  );
}
