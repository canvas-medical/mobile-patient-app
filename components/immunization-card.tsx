import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: g.size(12),
  },
  immunization: {
    ...g.bodyLarge,
    color: g.white,
  },
  immunizationInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});

export function ImmunizationCard({ immunization }: { immunization: Immunization }) {
  const {
    id,
    vaccineCode,
    occurrenceDateTime,
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
        <View style={s.cardContent}>
          <MaterialCommunityIcons name="needle" size={g.size(48)} color={g.white} />
          <View style={s.immunizationInfoContainer}>
            <Text
              style={s.immunization}
              numberOfLines={2}
            >
              {vaccineCode.coding[0].display}
            </Text>
            <Text style={s.immunization}>
              Last immunized:
              &nbsp;
              {new Date(occurrenceDateTime).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
