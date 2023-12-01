import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { g } from '@styles';
import { Immunization } from '@interfaces';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardBlur: {
    padding: g.size(16),
  },
  immunization: {
    ...g.labelSmall,
    color: g.white,
  },
  immunizationDate: {
    ...g.bodySmall,
    color: g.white,
  },
  immunizationInfoContainer: {
    flex: 1,
    gap: g.size(4),
  },
});

export function ImmunizationCard({ immunization }: { immunization: Immunization }) {
  const {
    resource: {
      id,
      vaccineCode,
      occurrenceDateTime,
    }
  } = immunization;

  return (
    <View
      key={id}
      style={s.card}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={s.cardBlur}
      >
        <View style={s.immunizationInfoContainer}>
          <Text
            style={s.immunization}
          >
            {vaccineCode.coding[0].display}
          </Text>
          <Text style={s.immunizationDate}>
            Last immunized:
            &nbsp;
            {new Date(occurrenceDateTime).toLocaleDateString()}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}
