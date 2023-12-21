import {
  StyleSheet, View, Text
} from 'react-native';
import { BlurFill, ExplainButton } from '@components';
import { Condition } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingHorizontal: g.size(16),
    paddingVertical: g.size(12),
  },
  condition: {
    ...g.labelMedium,
    color: g.white,
    maxWidth: '95%',
  },
  conditionDate: {
    ...g.labelSmall,
    color: g.white,
    alignSelf: 'flex-end',
  },
  conditionInfoContainer: {
    gap: g.size(8),
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
      <View style={s.conditionInfoContainer}>
        <Text style={s.condition}>
          {text}
        </Text>
        <Text style={s.conditionDate}>
          {new Date(recordedDate).toLocaleDateString()}
        </Text>
      </View>

    </ExplainButton>
  );
}
