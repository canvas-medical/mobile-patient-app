/* eslint-disable react-native/no-inline-styles */ // REMOVE ME
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Screen, ClickableCard } from '@components';
import { g } from '@styles';
import { ClickableCard } from '@components/clickable-card';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DocumentResource, Immunization } from '@interfaces';
import React from 'react';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: g.size(16),
    paddingBottom: g.size(120),
    gap: g.size(24),
  },
  invoicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: g.size(16),
    justifyContent: 'space-between',
  },
  sectionContainer: {
    flex: 1,
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

export function ListView({ items, icon, title, clickable, isFetching }:
  {items: DocumentResource[] | Immunization[], icon: React.JSX.Element, title: string, clickable?: boolean, isFetching?: boolean }) {
  const { type } = items[0];
  console.log(type);
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
          <View style={s.sectionContainer}>
            <View style={s.invoicesContainer}>
              {/* {items[0] instanceof Immunization && items.map((item) => ( */}
              {/*  <Text>Hello</Text> */}
              {/* )} */}
              {clickable && items.map((item) => {
                if (!item.resource.content[0].attachment.url) return null;
                return (
                  <ClickableCard
                    key={item.resource.id}
                    object={item}
                    uri={item.resource.content[0].attachment.url}
                  />
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
