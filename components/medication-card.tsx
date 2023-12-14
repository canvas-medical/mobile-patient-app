import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Medication } from '@interfaces';
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
  date: {
    ...g.bodySmall,
    color: g.white,
  },
  dosage: {
    ...g.bodyMedium,
    color: g.white,
    flex: 1,
  },
  dosageAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: g.size(12),
  },
  medication: {
    ...g.bodyLarge,
    color: g.white,
  },
  medicationInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    gap: g.size(8),
  },
  skeleton: {
    height: g.size(80),
    borderWidth: 1,
    borderColor: g.red,
    borderStyle: 'solid',
  }
});

export function MedicationCard({ med }: { med: Medication }) {
  const {
    medicationCodeableConcept: {
      coding: [{ display: medication }],
    },
    dosage,
    dateAsserted,
  } = med;

  return (
    <View style={s.card}>
      <BlurView
        intensity={40}
        tint="light"
        style={s.cardBlur}
      >
        <View style={s.cardContent}>
          <MaterialCommunityIcons name="pill" size={g.size(48)} color={g.white} />
          <View style={s.medicationInfoContainer}>
            <Text style={s.medication}>
              {medication.charAt(0).toUpperCase() + medication.slice(1)}
            </Text>
            <View style={s.dosageAndDateContainer}>
              <Text style={s.dosage}>
                {dosage[0].text.charAt(0).toUpperCase() + dosage[0].text.slice(1)}
              </Text>
              <Text style={s.date}>
                {new Date(dateAsserted).toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: 'short',
                  day: 'numeric'
                })}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

export function MedicationSkeleton() {
  return (
    <View style={[s.card, s.skeleton]}>
      <BlurView
        intensity={40}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
