import { StyleSheet, View, Text } from 'react-native';
import { BlurFill } from '@components';
import { Goal } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    padding: g.size(16),
  },
  goal: {
    ...g.labelSmall,
    color: g.white,
  },
  goalInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  goalInfoContainer: {
    flex: 1,
    gap: g.size(4),
  },
  goalText: {
    ...g.bodySmall,
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
    id,
    achievementStatus: { coding: [{ display: achievementStatus }] },
    priority: { coding: [{ display: priority }] },
    note: [{ text: note }],
    description: { text: description },
    target: [{ dueDate: targetDate }],
    startDate
  } = goal;
  const formattedDate = (date: string | number | Date) => new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View
      key={id}
      style={s.card}
    >
      <BlurFill />
      <View style={s.goalInfoContainer}>
        <Text
          style={s.goal}
        >
          {description}
        </Text>
        <Text
          style={s.goalText}
        >
          {note}
        </Text>
        <View style={s.row}>
          <Text
            style={s.goalText}
          >
            {achievementStatus}
          </Text>
          <View style={s.goalInfo}>
            <Text style={s.goalText}>
              {priority}
            </Text>
            <Text style={s.goalText}>
              {formattedDate(startDate)}
              {' to '}
              {formattedDate(targetDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
