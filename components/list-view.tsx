import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Allergy, DocumentResource, Immunization } from '@interfaces';
// eslint-disable-next-line max-len
// import { Header, Screen, ClickableCard, AllergyCard, ImmunizationCard } from '@components'; // TODO - Revisit this to prevent circular dependency and excessive imports
import { Header } from '@components/header';
import { Screen } from '@components/screen';
import { ClickableCard } from '@components/clickable-card';
import { AllergyCard } from '@components/allergy-card';
import { ImmunizationCard } from '@components/immunization-card';
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
  { items: DocumentResource[] | Immunization[] | Allergy[], icon: JSX.Element, title: string, clickable?: boolean, isFetching?: boolean }) {
  const listItems = () => {
    if (isImmunization(items[0])) {
      return items.map((item) => (
        <ImmunizationCard immunization={item} />
      ));
    } if (isAllergy(items[0])) {
      return items.map((item) => (
        <AllergyCard allergy={item} />
      ));
    } if (clickable) {
      return items.map((item) => {
        if (!item.resource.content[0].attachment.url) return null;
        return (
          <ClickableCard
            key={item.resource.id}
            object={item}
            uri={item.resource.content[0].attachment.url}
          />
        );
      });
    }
    return (
      <Text style={s.defaultText}>
        No
        {' '}
        {title}
        {' '}
        to display
      </Text>
    );
  };

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
            {listItems()}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
