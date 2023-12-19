import {
  StyleSheet, View, Text
} from 'react-native';
import { BlurView } from 'expo-blur';
import { ExplainButton } from '@components';
import { Condition } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardBlur: {
    paddingHorizontal: g.size(16),
    paddingVertical: g.size(12),
  },
  condition: {
    ...g.labelMedium,
    color: g.white,
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
      hl7code={condition.code.coding.find((obj) => obj.system.includes('hl7'))?.code}
      snomed={condition.code.coding.find((obj) => obj.system.includes('snomed'))?.code}
      description={condition.code.coding[0].display}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={s.cardBlur}
      >
        <View style={s.conditionInfoContainer}>
          <Text style={s.condition}>
            {text}
          </Text>
          <Text style={s.conditionDate}>
            {new Date(recordedDate).toLocaleDateString()}
          </Text>
        </View>
      </BlurView>
    </ExplainButton>
  );
}
