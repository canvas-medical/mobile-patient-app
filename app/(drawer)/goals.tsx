import { g } from '@styles';
import { Goal } from '@interfaces';
import { Feather } from '@expo/vector-icons';
import { useGoals } from '@services';
import { GoalCard, Header, Screen } from '@components';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

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
  const { data: items, isFetching }: { data: Goal[], isFetching: boolean } = useGoals();
  const activeStates = ['In Progress', 'Improving', 'Worsening', 'No Change', 'Sustaining'];
  const notActiveStates = ['Not Achieved', 'Not Attainable', 'Achieved'];
  const active = items.filter((item) => activeStates.includes(item.resource.achievementStatus.coding[0].display));
  const notActive = items.filter((item) => notActiveStates.includes(item.resource.achievementStatus.coding[0].display));

  return (
    <Screen>
      <Header />
      <ScrollView
        style={s.container}
        contentContainerStyle={s.contentContainer}
      >
        <View style={s.titleContainer}>
          <Feather name="target" size={g.size(36)} color={g.white} />
          ;
          <Text style={s.title}>
            Goals
          </Text>
        </View>
        {!isFetching ? (
          <View style={s.invoicesContainer}>
            {active.length
              ? (
                <View style={s.scrollSection}>
                  <Text style={s.label}>
                    Active
                  </Text>
                  {active.map((item) => <GoalCard goal={item} />)}
                </View>
              ) : null}
            {notActive.length
              ? (
                <View style={s.scrollSection}>
                  <Text style={s.label}>
                    Not Active
                  </Text>
                  {notActive.map((item) => <GoalCard goal={item} />)}
                </View>
              ) : null}
            {!notActive.length && !active.length
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
