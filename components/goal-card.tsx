import { StyleSheet, View, Text } from 'react-native';
import { formatDate } from '@utils';
import { Goal } from '@interfaces';
import { CardContainer } from '@components/card-container';
import { g } from '@styles';

const s = StyleSheet.create({
  date: {
    ...g.bodySmall,
    color: g.neutral600,
    alignSelf: 'flex-end',
  },
  datesContainer: {
    marginTop: g.hs(2),
  },
  goal: {
    flex: 1,
    ...g.labelMedium,
    color: g.neutral900,
  },
  goalInfo: {
    ...g.bodyMedium,
    color: g.neutral700,
  },
  priorityLabel: {
    ...g.bodySmall,
    textAlign: 'right',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: g.ms(8),
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
    <CardContainer>
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
    </CardContainer>
  );
}
