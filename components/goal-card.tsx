import { StyleSheet, View, Text } from 'react-native';
import { formatDate } from '@utils';
import { Goal } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
  },
  goal: {
    ...g.labelMedium,
    color: g.white,
  },
  goalInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  goalText: {
    ...g.bodyMedium,
    color: g.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export function GoalCard({ goal }: { goal: Goal }) {
  const {
    achievementStatus: { coding: [{ display: achievementStatus }] } = { coding: [{ display: '' }] },
    priority: { coding: [{ display: priority }] } = { coding: [{ display: '' }] },
    note: [{ text: note }] = [{ text: '' }],
    description: { text: description } = { text: '' },
    target: [{ dueDate: targetDate }] = [{ dueDate: '' }],
    startDate = ''
  } = goal ?? {};

  return (
    <View style={s.card}>
      <BlurFill />
      <Text style={s.goal}>
        {description}
      </Text>
      <Text style={s.goalText}>
        {note}
      </Text>
      <View style={s.row}>
        <Text style={s.goalText}>
          {achievementStatus}
        </Text>
        <View style={s.goalInfo}>
          <Text style={s.goalText}>
            {priority}
          </Text>
          <Text style={s.goalText}>
            {formatDate(startDate)}
            {' to '}
            {formatDate(targetDate)}
          </Text>
        </View>
      </View>
    </View>
  );
}
