import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { g } from '@styles';

const s = StyleSheet.create({
  blurContainer: {
    width: (g.width - g.size(48)) / 2,
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  firstBlurContainer: {
    width: g.width - g.size(32),
  },
  vitalBlur: {
    flex: 1,
    padding: g.size(12),
    gap: g.size(8),
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
  vitalRow: {
    flexDirection: 'row',
    gap: g.size(8),
    justifyContent: 'space-between',
  },
});

export function VitalCard({ vital, vitalsOdd, index }: {
  vital: any, // TODO: type
  vitalsOdd: boolean,
  index: number,
}) {
  const { date, type, value } = vital;
  return (
    <View
      style={[
        s.blurContainer,
        index === 0 && vitalsOdd && s.firstBlurContainer
      ]}
    >
      <BlurView
        style={s.vitalBlur}
        tint="light"
        intensity={50}
      >
        <View style={s.vitalRow}>
          <Text style={s.vitalLabel}>
            {type}
          </Text>
          <Feather name="heart" size={g.size(20)} color={g.white} />
        </View>
        <View style={s.vitalRow}>
          <Text style={s.vitalDate}>
            <Text style={s.vitalDate}>
              {new Date(date).toLocaleDateString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </Text>
          <Text style={s.vitalData}>
            {value}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}
