import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Medication } from '@interfaces';
import { BlurView } from 'expo-blur';
import { g } from '@styles';

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
  dosage: {
    ...g.bodySmall,
    color: g.white,
  },
  medication: {
    ...g.bodyLarge,
    color: g.white,
  },
  medicationInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});

export function MedicationCard({ med }: { med: Medication }) {
  const {
    id,
    medication,
    dosage,
  } = med;

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
          <MaterialCommunityIcons name="pill" size={g.size(48)} color={g.white} />
          <View style={s.medicationInfoContainer}>
            <Text
              style={s.medication}
              numberOfLines={2}
            >
              {medication}
            </Text>
            <Text style={s.dosage}>
              Last filled:
              &nbsp;
              {dosage}
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
