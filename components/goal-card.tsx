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
  },
  date: {
    ...g.bodySmall,
    color: g.white,
    alignSelf: 'flex-end',
  },
  datesContainer: {
    marginTop: g.size(4),
  },
  goal: {
    flex: 1,
    ...g.labelMedium,
    color: g.white,
  },
  goalInfo: {
    ...g.bodyMedium,
    color: g.white,
  },
  priorityLabel: {
    ...g.bodySmall,
    textAlign: 'right',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: g.size(8),
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

  const priorityColor = {
    'High Priority': g.severityRed,
    'Medium Priority': g.severityYellow,
    'Low Priority': g.severityGreen,
  };

  return (
    <View style={s.card}>
      <BlurFill />
      <View style={s.rowSpaceBetween}>
        <Text
          style={s.goal}
          numberOfLines={3}
        >
          {description}
        </Text>
        <Text style={[s.priorityLabel, { color: priorityColor[priority] }]}>
          {priority.split(' ')[0]}
          {'\n'}
          {priority.split(' ')[1]}
        </Text>
      </View>
      <Text style={s.goalInfo}>
        Status:
        &nbsp;
        {achievementStatus}
      </Text>
      {!!note && (
        <Text style={s.goalInfo}>
          Note:
          &nbsp;
          {note}
        </Text>
      )}
      <View style={s.datesContainer}>
        <Text style={s.date}>
          Started:
          &nbsp;
          {formatDate(startDate)}
        </Text>
        {!!targetDate && (
          <Text style={s.date}>
            Target Date:
            &nbsp;
            {formatDate(targetDate)}
          </Text>
        )}
      </View>
    </View>
  );
}
