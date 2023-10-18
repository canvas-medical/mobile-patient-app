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
  medication: {
    ...g.bodyLarge,
    color: g.white,
  },
  medicationInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  medicationStatusInfo: {
    ...g.bodySmall,
    color: g.white,
  },
  price: {
    ...g.bodySmall,
    color: g.secondaryBlue,
  },
  pricePill: {
    backgroundColor: g.white,
    paddingVertical: g.size(2),
    paddingHorizontal: g.size(8),
    borderRadius: g.size(50),
    alignSelf: 'flex-start',
  },
});

export function MedicationCard({ med }: { med: Medication }) {
  const {
    medication,
    quantity,
    refills_left: refillsLeft,
    last_filled: lastFilled,
    cost,
  } = med;

  return (
    <View style={s.card}>
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
              numberOfLines={1}
            >
              {medication}
            </Text>
            <Text
              style={s.medicationStatusInfo}
              numberOfLines={1}
            >
              Qty:
              &nbsp;
              {quantity}
            </Text>
            <Text
              style={s.medicationStatusInfo}
              numberOfLines={1}
            >
              Refills left:
              &nbsp;
              {refillsLeft}
            </Text>
            <Text
              style={s.medicationStatusInfo}
              numberOfLines={1}
            >
              Last filled:
              &nbsp;
              {lastFilled}
            </Text>
          </View>
          <View style={s.pricePill}>
            <Text style={s.price}>
              $
              {cost}
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
