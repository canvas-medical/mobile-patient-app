import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  Screen,
  ProfileCard,
  LabeledToggle,
  RecordCard,
  MedicationCard,
  Search,
} from '@components';
import { g } from '@styles';
import { recordsData, medicationData } from '../../dummyData';

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: g.size(72),
  },
  dataContainer: {
    paddingHorizontal: g.size(16),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scroll: {
    paddingHorizontal: g.size(16),
  },
  scrollContent: {
    gap: g.size(12),
    paddingVertical: g.size(12),
  },
  subTitle: {
    ...g.titleXSmall,
    color: g.white,
    marginBottom: g.size(4),
    marginLeft: g.size(8),
  },
  title: {
    ...g.titleLarge,
  },
});

export default function Records() {
  const [toggled, setToggled] = useState(false);
  return (
    <Screen style={s.container}>
      <View style={s.dataContainer}>
        <View style={s.headerContainer}>
          <Text style={s.title}>Profile</Text>
          <Search />
        </View>
        <ProfileCard />
        <Text style={s.title}>
          Records
        </Text>
        <LabeledToggle
          toggled={toggled}
          setToggled={setToggled}
        />
      </View>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
      >
        {toggled
          ? medicationData.map((med) => <MedicationCard key={med.id} med={med} />)
          : recordsData.map((rec, i) => (
            <View>
              {i === 0 && <Text style={s.subTitle}>Latest</Text>}
              {i === 1 && <Text style={s.subTitle}>Previous</Text>}
              <RecordCard key={rec.id} rec={rec} index={i} />
            </View>
          ))}
      </ScrollView>
    </Screen>
  );
}
