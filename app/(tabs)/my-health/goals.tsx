import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Goal } from '@interfaces';
import { useGoals } from '@services';
import { GoalCard, Header, Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: g.size(16),
    paddingBottom: g.size(120),
    gap: g.size(24),
  },
  defaultText: {
    ...g.bodyLarge,
    color: g.white,
    opacity: 0.8,
    paddingLeft: g.size(30),
    paddingTop: g.size(10),
  },
  invoicesContainer: {
    rowGap: g.size(16),
    justifyContent: 'space-between',
  },
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  scrollSection: {
    gap: g.size(16),
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    marginTop: g.size(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(20),
    paddingLeft: g.size(20)
  },
});
export default function Goals() {
  const { data, isFetching }: { data: { entry: Goal[] }, isFetching: boolean } = useGoals();
  const activeStates = ['In Progress', 'Improving', 'Worsening', 'No Change', 'Sustaining'];
  const inactiveStates = ['Not Achieved', 'Not Attainable', 'Achieved'];
  const activeGoals = data?.entry.filter((item) => activeStates.includes(item.resource.achievementStatus.coding[0].display));
  const inactiveGoals = data?.entry.filter((item) => inactiveStates.includes(item.resource.achievementStatus.coding[0].display));

  return (
    <Screen>
      <Header />
      <ScrollView
        style={s.container}
        contentContainerStyle={s.contentContainer}
      >
        <View style={s.titleContainer}>
          <Feather name="target" size={g.size(36)} color={g.white} />
          <Text style={s.title}>
            Goals
          </Text>
        </View>
        {!isFetching ? (
          <View style={s.invoicesContainer}>
            {activeGoals.length
              ? (
                <View style={s.scrollSection}>
                  <Text style={s.label}>
                    Active
                  </Text>
                  {activeGoals.map((item) => <GoalCard goal={item} />)}
                </View>
              ) : null}
            {inactiveGoals.length
              ? (
                <View style={s.scrollSection}>
                  <Text style={s.label}>
                    Inactive
                  </Text>
                  {inactiveGoals.map((item) => <GoalCard goal={item} />)}
                </View>
              ) : null}
            {!inactiveGoals.length && !activeGoals.length
              ? (
                <Text style={s.defaultText}>
                  No goals found
                </Text>
              ) : null}
          </View>
        ) : <ActivityIndicator size="large" />}
      </ScrollView>
    </Screen>
  );
}
