import { StyleSheet, Text } from 'react-native';
import { formatDate } from '@utils';
import { Condition } from '@interfaces';
import { CardContainer } from '@components/card-container';
import { g } from '@styles';

const s = StyleSheet.create({
  condition: {
    ...g.labelMedium,
    color: g.neutral900,
    maxWidth: '95%',
  },
  conditionDate: {
    ...g.bodySmall,
    color: g.neutral600,
    alignSelf: 'flex-end',
  },
});

export function ConditionCard({ condition }: { condition: Condition }) {
  const {
    code: { text = '' } = {},
    recordedDate = ''
  } = condition ?? {};

  return (
    <CardContainer>
      <Text style={s.condition}>
        {text}
      </Text>
      <Text style={s.conditionDate}>
        {formatDate(recordedDate)}
      </Text>
    </CardContainer>
  );
}
