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
    paddingVertical: g.size(16),
    paddingHorizontal: g.size(20),
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: g.size(12),
  },
  cube: {
    width: g.size(70),
    height: g.size(70),
    backgroundColor: g.white,
    borderRadius: g.size(4),
    justifyContent: 'center',
    alignItems: 'center',
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
          <View style={s.cube}>
            <MaterialCommunityIcons name="pill" size={48} color={g.blurBlue} />
          </View>
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
