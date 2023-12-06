import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Screen, ClickableCard, AllergyCard, GoalCard } from '@components';
import { Goal } from '@interfaces';
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

export function GoalListView({ items, icon, title, clickable, isFetching }:
  {items: Goal[], icon: React.JSX.Element, title: string, clickable?: boolean, isFetching?: boolean }) {
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
          {icon}
          <Text style={s.title}>
            {title}
          </Text>
        </View>
        {!isFetching && (
        <View style={s.invoicesContainer}>
          {active.length
          && (
          <View style={s.scrollSection}>
            <Text style={s.label}>
              Active
            </Text>
            {active.map((item) => <GoalCard goal={item} />)}
          </View>
          )
          }
          {notActive.length
            && (
          <View style={s.scrollSection}>
            <Text style={s.label}>
              Not Active
            </Text>
            {notActive.map((item) => <GoalCard goal={item} />)}
          </View>
          }
          {!notActive.length && !active.length && (
            <Text style={s.defaultText}>
              No goals found
            </Text>
          )}
        </View>
        )}
      </ScrollView>
    </Screen>
  );
}
