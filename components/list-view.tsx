import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Screen, ClickableCard, AllergyCard } from '@components';
import { g } from '@styles';
import { Allergy, DocumentResource, Immunization } from '@interfaces';
import React from 'react';
import { ImmunizationCard } from '@components/immunization-card';

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

// Type-guard
export function isImmunization(arg: any): arg is Immunization {
  return arg?.resource?.vaccineCode !== undefined;
}

export function isAllergy(arg: any): arg is Immunization {
  return arg?.resource?.reaction !== undefined;
}

export function ListView({ items, icon, title, clickable, isFetching }:
  {items: DocumentResource[] | Immunization[] | Allergy[], icon: React.JSX.Element, title: string, clickable?: boolean, isFetching?: boolean }) {
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
              {isImmunization(items[0]) && items.map((item) => (
                <ImmunizationCard immunization={item} />
              ))}
              {isAllergy(items[0]) && items.map((item) => (
                <AllergyCard allergy={item} />
              ))}
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
