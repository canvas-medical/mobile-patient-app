import { StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { g } from '@styles';
import { Goal } from '@interfaces';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  cardBlur: {
    padding: g.size(16),
  },
  goal: {
    ...g.labelSmall,
    color: g.white,
  },
  goalDate: {
    ...g.bodySmall,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export function GoalCard({ goal }: { goal: Goal }) {
  const {
    resource: {
      id,
      achievementStatus: { coding: [{ display: achievementStatus }] },
      priority: { coding: [{ display: priority }] },
      note: [{ text: note }],
      description: { text: description },
      target: [{ dueDate: targetDate }],
      startDate
    }
  } = goal;
  console.log(goal);

  return (
    <View
      key={id}
      style={s.card}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={s.cardBlur}
      >
        <View style={s.goalInfoContainer}>
          <Text
            style={s.goal}
          >
            {description}
          </Text>
          <Text
            style={s.goalDate}
          >
            {note}
          </Text>
          <View style={s.row}>
            <Text
              style={s.goalDate}
            >
              {achievementStatus}
            </Text>
            <View style={s.goalInfo}>
              <Text style={s.goalDate}>
                {priority}
              </Text>
              <Text style={s.goalDate}>
                {startDate}
                {' to '}
                {targetDate}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}
