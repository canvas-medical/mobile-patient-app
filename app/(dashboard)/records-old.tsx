import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  Screen,
  ProfileCard,
  LabeledToggle,
  RecordCard,
  MedicationCard,
  Search,
} from '@components';
import { usePatient } from '@services';
import { g } from '@styles';
import { recordsData, medicationData } from '../../dummyData';

const s = StyleSheet.create({
  dataContainer: {
    marginTop: g.size(72),
    paddingHorizontal: g.size(16),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordsContainer: {
    height: g.height * 0.925,
    marginTop: g.size(16),
  },
  recordsHeader: {
    paddingHorizontal: g.size(16),
  },
  scroll: {
    paddingHorizontal: g.size(16),
  },
  scrollContent: {
    gap: g.size(12),
    paddingTop: g.size(12),
    paddingBottom: g.size(120),
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

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => (
  layoutMeasurement.height + contentOffset.y
  >= contentSize.height - g.size(48)
);

export default function Records() {
  const [toggled, setToggled] = useState<boolean>(false);
  const [mainScrollEnd, setMainScrollEnd] = useState<boolean>(false);
  const [nestedScrollTop, setNestedScrollTop] = useState<boolean>(true);
  const { data: patient } = usePatient();
  const { id: patientID } = patient;

  const opacityAnimation = useRef(new Animated.Value(0.5)).current;
  const opacityStyle = { opacity: opacityAnimation };
  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: mainScrollEnd ? 0 : 1,
      duration: 700,
      useNativeDriver: true
    }).start();
  }, [mainScrollEnd]);

  if (!patientID) return <ActivityIndicator style={s.loading} size="large" color={g.white} />; // Maybe remove this and put api data in state?
  return (
    <Screen>
      <ScrollView
        scrollEnabled={nestedScrollTop}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setMainScrollEnd(true);
          } else setMainScrollEnd(false);
        }}
        scrollEventThrottle={16}
      >
        <Animated.View style={[s.dataContainer, opacityStyle]}>
          <View style={s.headerContainer}>
            <Text style={s.title}>Profile</Text>
            <Search />
          </View>
          <ProfileCard />
        </Animated.View>
        <View style={s.recordsContainer}>
          <View style={s.recordsHeader}>
            <Text style={s.title}>
              Records
            </Text>
            <LabeledToggle
              toggled={toggled}
              setToggled={setToggled}
              optionOne="Lab Results"
              optionTwo="Medications"
            />
          </View>
          <ScrollView
            style={s.scroll}
            contentContainerStyle={s.scrollContent}
            scrollEnabled={mainScrollEnd}
            onScroll={({ nativeEvent }) => {
              if (nativeEvent.contentOffset.y < 10) {
                setNestedScrollTop(true);
              } else setNestedScrollTop(false);
            }}
            scrollEventThrottle={16}
          >
            {toggled
              ? medicationData.map((med) => <MedicationCard key={med.id} med={med} />)
              : recordsData.map((rec, i) => (
                <View key={rec.id}>
                  {i === 0 && <Text style={s.subTitle}>Latest</Text>}
                  {i === 1 && <Text style={s.subTitle}>Previous</Text>}
                  <RecordCard rec={rec} index={i} />
                </View>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Screen>
  );
}
