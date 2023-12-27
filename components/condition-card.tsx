import { StyleSheet, Text } from 'react-native';
import { formatDate } from '@utils';
import { Condition } from '@interfaces';
import { BlurFill, ExplainButton } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(8),
  },
  condition: {
    ...g.labelMedium,
    color: g.white,
    maxWidth: '95%',
  },
  conditionDate: {
    ...g.bodySmall,
    color: g.white,
    alignSelf: 'flex-end',
  },
});

export function ConditionCard({ condition }: { condition: Condition }) {
  const {
    code: { text },
    recordedDate,
  } = condition;

  return (
    <ExplainButton
      style={s.card}
      id={condition.id}
      resourceType={condition.resourceType}
      codes={condition.code.coding}
      description={condition.code.coding[0].display}
    >
      <BlurFill />
      <Text style={s.condition}>
        {text}
      </Text>
      <Text style={s.conditionDate}>
        {formatDate(recordedDate)}
      </Text>
    </ExplainButton>
  );
}
