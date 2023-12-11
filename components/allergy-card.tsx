import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Allergy } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  allergy: {
    ...g.labelSmall,
    color: g.white,
  },
  allergyInfo: {
    ...g.bodySmall,
    color: g.white,
  },
  allergyInfoContainer: {
    flex: 1,
    gap: g.size(4),
  },
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardBlur: {
    padding: g.size(16),
  },
  extraInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export function AllergyCard({ allergy }: { allergy: Allergy }) {
  const {
    id,
    code: {
      coding: [{ display }],
    },
    note: [{ text }],
    reaction: [{ severity }],
  } = allergy;

  const severityColor = (): string => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return g.severityGreen;
      case 'moderate':
        return g.severityYellow;
      case 'severe':
        return g.severityRed;
      default:
        return g.white;
    }
  };

  const capitalizeFirstCharacter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);
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
        <View style={s.allergyInfoContainer}>
          <Text
            style={s.allergy}
          >
            {capitalizeFirstCharacter(display)}
          </Text>
          <View style={s.extraInfo}>
            <Text style={s.allergyInfo}>
              {capitalizeFirstCharacter(text)}
            </Text>
            <Text style={{ ...s.allergyInfo, color: severityColor() }}>
              {capitalizeFirstCharacter(severity)}
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
