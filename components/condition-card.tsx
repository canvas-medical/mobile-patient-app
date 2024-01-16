import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from '@utils';
import { Condition } from '@interfaces';
import { BlurFill } from '@components';
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
    color: g.black,
    maxWidth: '95%',
  },
  conditionDate: {
    ...g.bodySmall,
    color: g.black,
    alignSelf: 'flex-end',
  },
});

export function ConditionCard({ condition }: { condition: Condition }) {
  const {
    code: { text = '' } = {},
    recordedDate = ''
  } = condition ?? {};

  return (
    <View style={s.card}>
      <BlurFill />
      <Text style={s.condition}>
        {text}
      </Text>
      <Text style={s.conditionDate}>
        {formatDate(recordedDate)}
      </Text>
    </View>
  );
}
