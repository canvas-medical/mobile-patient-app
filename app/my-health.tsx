import 'react-native-gesture-handler';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import {
  AllergyCard,
  ConditionCard,
  DiagnosticCard,
  GoalCard,
  Header,
  ImmunizationCard,
  MedicationCard,
  Screen,
  VitalCard, VitalCardSkeleton,
  VitalsSkeleton
} from '@components';
import { g } from '@styles';
import React from 'react';
import {
  useAllergies,
  useConditions,
  useDiagnostics, useGoals,
  useImmunizations,
  useMedications,
  useObservations
} from '@services';
import { MyHealthBlock } from '@components/my-health-block';
import { FontAwesome5, MaterialCommunityIcons, Fontisto, Feather } from '@expo/vector-icons';
import { Allergy, Condition, Goal, Immunization } from '@interfaces';
import { BlurView } from 'expo-blur';

const s = StyleSheet.create({
  scroll: {
    width: '100%',
    paddingHorizontal: g.size(20),
    marginBottom: g.size(80),
  },
  scrollContent: {
    gap: g.size(16),
    paddingBottom: g.size(32),
  },
  vitalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: g.size(16),
    justifyContent: 'space-between',
  },
});

export default function MyHealth() {
  const { data: vitals, isLoading: loadingVitals } = useObservations();
  const { data: diagnostics, isLoading: loadingDiagnostics } = useDiagnostics();
  const { data: medications, isLoading: loadingMedications } = useMedications();
  const { data: conditions, isLoading: loadingConditions } = useConditions();
  const { data: immunizations, isLoading: loadingImmunizations } = useImmunizations();
  const { data: allergies, isLoading: loadingAllergies } = useAllergies();
  const { data: goals, isFetching: loadingGoals }: { data: { entry: Goal[] }, isFetching: boolean } = useGoals();

  const activeGoalStates = ['In Progress', 'Improving', 'Worsening', 'No Change', 'Sustaining'];

  const activeMedications = medications?.filter((med) => med.status === 'active');
  const activeConditions = conditions?.filter((condition) => condition.clinicalStatus.text === 'Active');
  const activeGoals = goals?.entry.filter((item) => activeGoalStates.includes(item.resource.achievementStatus.coding[0].display));

  return (
    <Screen>
      <Header />
      <ScrollView
        contentContainerStyle={s.scrollContent}
        style={s.scroll}
      >
        <MyHealthBlock title="Vitals" icon={<FontAwesome5 name="heartbeat" size={g.size(20)} color={g.white} />}>
          <View style={s.vitalsContainer}>
            {loadingVitals && Array.from(Array(6)).map((i) => (
              <VitalCardSkeleton index={i} vitalsOdd={false} />
            ))}
            {vitals?.map((vital, i) => (
              <VitalCard
                index={i}
                key={vital.id}
                vital={vital}
                vitalsOdd={vitals.length % 2 !== 0}
              />
            ))}
          </View>
        </MyHealthBlock>
        <MyHealthBlock
          limit={1}
          viewAllRoute="metrics-reports"
          title="Labs"
          icon={<FontAwesome5 name="vial" size={g.size(20)} color={g.white} />}
        >
          {diagnostics?.slice(0, 1).map((diagnostic) => (<DiagnosticCard data={diagnostic} key={diagnostic.id} />))}
          {loadingDiagnostics && <ActivityIndicator />}
        </MyHealthBlock>
        <MyHealthBlock
          limit={1}
          viewAllRoute="appointments-medications"
          title="Medications"
          icon={<MaterialCommunityIcons name="pill" size={g.size(20)} color={g.white} />}
        >
          {activeMedications?.slice(0, 1).map((med) => <MedicationCard key={med.id} med={med} />)}
          {loadingMedications && <ActivityIndicator />}
        </MyHealthBlock>
        <MyHealthBlock
          limit={1}
          viewAllRoute="conditions"
          title="Conditions"
          icon={<FontAwesome5 name="heartbeat" size={g.size(20)} color={g.white} />}
        >
          {activeConditions?.slice(0, 1).map((condition: Condition) => (<ConditionCard key={condition.id} condition={condition} />))}
          {loadingConditions && <ActivityIndicator />}
        </MyHealthBlock>
        <MyHealthBlock
          limit={1}
          viewAllRoute="immunizations"
          title="Immunizations"
          icon={<Fontisto name="injection-syringe" size={g.size(20)} color={g.white} />}
        >
          {immunizations?.slice(0, 1).map((immunization: Immunization) => (<ImmunizationCard key={immunization.id} immunization={immunization} />))}
          {loadingImmunizations && <ActivityIndicator />}
        </MyHealthBlock>
        <MyHealthBlock
          limit={1}
          viewAllRoute="allergies"
          title="Allergies"
          icon={<MaterialCommunityIcons name="peanut-off-outline" size={g.size(20)} color={g.white} />}
        >
          {allergies?.slice(0, 1).map((allergy: Allergy) => (<AllergyCard key={allergy.id} allergy={allergy} />))}
          {loadingAllergies && <ActivityIndicator />}
        </MyHealthBlock>
        <MyHealthBlock
          limit={1}
          viewAllRoute="goals"
          title="Goals"
          icon={<Feather name="target" size={g.size(20)} color={g.white} />}
        >
          {activeGoals?.slice(0, 1).map((item) => <GoalCard goal={item} />)}
          {loadingGoals && <ActivityIndicator />}
        </MyHealthBlock>
        <MyHealthBlock
          limit={1}
          viewAllRoute="education"
          title="Educational Materials"
          icon={<MaterialCommunityIcons name="book-open-page-variant-outline" size={g.size(20)} color={g.white} />}
        >
          {[]}
        </MyHealthBlock>
      </ScrollView>
    </Screen>
  );
}
