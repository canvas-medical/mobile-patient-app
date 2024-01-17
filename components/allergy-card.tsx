import { StyleSheet, View, Text } from 'react-native';
import { capitalizeFirstCharacter, formatDate } from '@utils';
import { Allergy } from '@interfaces';
import { CardContainer } from '@components/card-container';
import { g } from '@styles';

const s = StyleSheet.create({
  allergy: {
    ...g.labelMedium,
    color: g.black,
  },
  allergyInfo: {
    ...g.bodySmall,
    color: g.black,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severity: {
    ...g.bodySmall,
    fontFamily: 'InterSemiBold'
  },
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
        return g.black;
    }
  };

  return (
    <CardContainer>
      <View style={s.row}>
        <Text style={s.allergy}>
          {capitalizeFirstCharacter(display)}
        </Text>
        <Text style={[s.severity, { color: severityColor() }]}>
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
    </CardContainer>
  );
}
