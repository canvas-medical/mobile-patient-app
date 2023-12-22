import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Goal } from '@interfaces';
import { useGoals } from '@services';
import { GoalCard, StackListView } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  scrollSection: {
    gap: g.size(16),
  },
});

export default function Goals() {
  const { data, isLoading, refetch } = useGoals();
  const activeStates = ['In Progress', 'Improving', 'Worsening', 'No Change', 'Sustaining'];
  const inactiveStates = ['Not Achieved', 'Not Attainable', 'Achieved'];
  const activeGoals = data?.filter((item: Goal) => activeStates.includes(item.achievementStatus.coding[0].display));
  const inactiveGoals = data?.filter((item: Goal) => inactiveStates.includes(item.achievementStatus.coding[0].display));

  return (
    <StackListView
      title="Goals"
      icon={<Feather name="target" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {activeGoals.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Active
          </Text>
          {activeGoals.map((goal: Goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
            />
          ))}
        </View>
      )}
      {inactiveGoals.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Inactive
          </Text>
          {inactiveGoals.map((goal: Goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
            />
          ))}
        </View>
      )}
    </StackListView>
  );
}
