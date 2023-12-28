import { StyleSheet, View, Text } from 'react-native';
import { capitalizeFirstCharacter, formatDate } from '@utils';
import { Allergy } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  allergy: {
    ...g.labelMedium,
    color: g.white,
  },
  allergyInfo: {
    ...g.bodySmall,
    color: g.white,
  },
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export function AllergyCard({ allergy }: { allergy: Allergy }) {
  const {
    code: { coding: [{ display = '' } = {}] = [] } = {},
    note: [{ text = '' } = {}] = [],
    reaction: [{ severity = '' } = {}] = [],
    recordedDate = ''
  } = allergy ?? {};

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

  return (
    <View style={s.card}>
      <BlurFill />
      <View style={s.row}>
        <Text style={s.allergy}>
          {capitalizeFirstCharacter(display)}
        </Text>
        <Text style={{ ...s.allergyInfo, color: severityColor() }}>
          {capitalizeFirstCharacter(severity)}
        </Text>
      </View>
      <View style={s.row}>
        <Text style={s.allergyInfo}>
          {capitalizeFirstCharacter(text)}
        </Text>
        <Text style={s.allergyInfo}>
          {formatDate(recordedDate)}
        </Text>
      </View>
    </View>
  );
}
