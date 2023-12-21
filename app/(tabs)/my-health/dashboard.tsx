import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome5, MaterialCommunityIcons, Fontisto, Feather } from '@expo/vector-icons';
import {
  AiWelcomeWizard,
  AllergyCard,
  ConditionCard,
  DiagnosticCard,
  DiagnosticSkeleton,
  GoalCard,
  Header,
  ImmunizationCard,
  LabImagingReportCard,
  MedicationCard,
  MedicationSkeleton,
  MyHealthBlock,
  ProcedureCard,
  Screen,
  VitalCard,
  VitalCardSkeleton,
} from '@components';
import {
  useAllergies,
  useConditions,
  useGoals,
  useImmunizations,
  useLabResults,
  useMedications,
  useObservations,
  useEducationalMaterials,
  useProcedures,
} from '@services';
import {
  Allergy,
  Condition,
  Goal,
  Immunization,
  Medication,
  DiagnosticReport,
  Vital,
  LabImagingReport, Procedure,
} from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  maskedView: {
    flex: 1,
  },
  scrollContent: {
    minHeight: '100%',
    gap: g.size(16),
    paddingHorizontal: g.size(16),
    paddingTop: g.size(32),
  },
  vitalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: g.size(16),
    justifyContent: 'space-between',
  },
});

export default function Dashboard() {
  const [openWizard, setOpenWizard] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  const { data: vitals, isLoading: loadingVitals } = useObservations();
  const { data: medications, isLoading: loadingMedications } = useMedications();
  const { data: allergies, isLoading: loadingAllergies } = useAllergies();
  const { data: procedures, isLoading: loadingProcedures } = useProcedures();
  const { data: immunizations, isLoading: loadingImmunizations } = useImmunizations();
  const { data: conditions, isLoading: loadingConditions } = useConditions();
  const { data: goals, isFetching: loadingGoals } = useGoals();
  const { data: labs, isLoading: loadingLabs } = useLabResults();
  const { data: educationalMaterials, isLoading: loadingEducationalMaterials } = useEducationalMaterials();
  useEffect(() => {
    const welcomeWizard = async () => {
      const isReturningUser = await SecureStore.getItemAsync('is_returning_user');
      if (!isReturningUser) {
        setOpenWizard(true);
        await SecureStore.setItemAsync('is_returning_user', 'true');
      }
    };
    welcomeWizard();
  }, []);
  // const loadingProcedures = false;
  // const procedures = [{
  //   resourceType: 'Procedure',
  //   id: '2dd9a3bc-a3bb-472b-aaef-c57be394de39',
  //   status: 'unknown',
  //   code: {
  //     coding: [
  //       {
  //         system: 'http://www.ama-assn.org/go/cpt',
  //         code: '23066',
  //         display: 'Biopsy soft tissue shoulder deep'
  //       }
  //     ]
  //   },
  //   subject: {
  //     reference: 'Patient/b8dfa97bdcdf4754bcd8197ca78ef0f0',
  //     type: 'Patient'
  //   },
  //   performedDateTime: '2023-09-20T21:18:54.263690+00:00'
  // }];

  const activeGoalStates = ['In Progress', 'Improving', 'Worsening', 'No Change', 'Sustaining'];

  const activeMedications = medications?.filter((med) => med.status === 'active');
  const activeConditions = conditions?.filter((condition) => condition.clinicalStatus.text === 'Active');
  const activeGoals = goals?.filter((item) => activeGoalStates.includes(item.achievementStatus.coding[0].display));

  return (
    <Screen>
      <Header />
      <AiWelcomeWizard setModalVisible={setOpenWizard} modalVisible={openWizard} />
      <MaskedView
        style={s.maskedView}
        maskElement={(
          <LinearGradient
            style={s.maskedView}
            colors={[g.transparent, g.white]}
            locations={[0, 0.05]}
          />
        )}
      >
        <ScrollView
          contentContainerStyle={[
            s.scrollContent,
            { paddingBottom: tabBarHeight + g.size(32) },
          ]}
        >
          {/* Vitals */}
          <MyHealthBlock
            title="Vitals"
            viewAll={false}
            icon={<FontAwesome5 name="heartbeat" size={g.size(20)} color={g.white} />}
          >
            <View style={s.vitalsContainer}>
              {loadingVitals ? Array.from(Array(6)).map((i: number) => (
                <VitalCardSkeleton index={i} vitalsOdd={false} />
              )) : vitals?.map((vital: Vital, i: number) => (
                <VitalCard
                  index={i}
                  key={vital.id}
                  vital={vital}
                  vitalsOdd={vitals.length % 2 !== 0}
                />
              ))}
            </View>
          </MyHealthBlock>

          {/* Medications */}
          <MyHealthBlock
            viewAllRoute="my-health/medications"
            title="Medications"
            viewAll={medications?.length > 1}
            icon={<MaterialCommunityIcons name="pill" size={g.size(20)} color={g.white} />}
          >
            {loadingMedications
              ? <MedicationSkeleton />
              : activeMedications?.slice(0, 1).map((med: Medication) => (
                <MedicationCard
                  key={med.id}
                  med={med}
                />
              ))}
          </MyHealthBlock>

          {/* Allergies */}
          <MyHealthBlock
            viewAllRoute="my-health/allergies"
            title="Allergies"
            viewAll={allergies?.length > 1}
            icon={<MaterialCommunityIcons name="peanut-off-outline" size={g.size(20)} color={g.white} />}
          >
            {loadingAllergies
              ? <ActivityIndicator color={g.white} />
              : allergies?.slice(0, 1).map((allergy: Allergy) => (
                <AllergyCard
                  key={allergy.id}
                  allergy={allergy}
                />
              ))}
          </MyHealthBlock>

          {/* Procedures */}
          <MyHealthBlock
            viewAllRoute="my-health/procedures"
            title="Procedures"
            viewAll={procedures?.length > 1}
            icon={<FontAwesome5 name="procedures" size={g.size(20)} color={g.white} />}
          >
            {loadingProcedures
              ? <ActivityIndicator color={g.white} />
              : procedures?.slice(0, 1).map((procedure: Procedure) => (
                <ProcedureCard
                  key={procedure.id}
                  procedure={procedure}
                />
              ))}
          </MyHealthBlock>

          {/* Immunizations */}
          <MyHealthBlock
            viewAllRoute="my-health/immunizations"
            title="Immunizations"
            viewAll={immunizations?.length > 1}
            icon={<Fontisto name="injection-syringe" size={g.size(20)} color={g.white} />}
          >
            {loadingImmunizations
              ? <ActivityIndicator color={g.white} />
              : immunizations?.slice(0, 1).map((immunization: Immunization) => (
                <ImmunizationCard
                  key={immunization.id}
                  immunization={immunization}
                />
              ))}
          </MyHealthBlock>

          {/* Conditions */}
          <MyHealthBlock
            viewAllRoute="my-health/conditions"
            title="Conditions"
            viewAll={conditions?.length > 1}
            icon={<FontAwesome5 name="heartbeat" size={g.size(20)} color={g.white} />}
          >
            {loadingConditions
              ? <ActivityIndicator color={g.white} />
              : activeConditions?.slice(0, 1).map((condition: Condition) => (
                <ConditionCard
                  key={condition.id}
                  condition={condition}
                />
              ))}
          </MyHealthBlock>

          {/* Labs */}
          <MyHealthBlock
            viewAllRoute="my-health/lab-results"
            title="Labs"
            viewAll={labs?.length > 1}
            icon={<FontAwesome5 name="vial" size={g.size(20)} color={g.white} />}
          >
            {loadingLabs ? <DiagnosticSkeleton /> : labs.slice(0, 1).map((report: LabImagingReport | DiagnosticReport) => {
              if (report.resourceType === 'DocumentReference') {
                return (
                  <LabImagingReportCard
                    key={report.id}
                    report={report as LabImagingReport}
                  />
                );
              }
              return (
                <DiagnosticCard
                  key={report.id}
                  report={report as DiagnosticReport}
                />
              );
            })}
          </MyHealthBlock>

          {/* Goals */}
          <MyHealthBlock
            viewAllRoute="my-health/goals"
            title="Goals"
            viewAll={goals?.length > 1}
            icon={<Feather name="target" size={g.size(20)} color={g.white} />}
          >
            {loadingGoals
              ? <ActivityIndicator color={g.white} />
              : activeGoals?.slice(0, 1).map((goal: Goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                />
              ))}
          </MyHealthBlock>

          {/* Educational Materials */}
          {/* TODO: update with education components and data */}
          <MyHealthBlock
            viewAllRoute="my-health/education"
            title="Educational Materials"
            viewAll={educationalMaterials?.length > 1}
            icon={<MaterialCommunityIcons name="book-open-page-variant-outline" size={g.size(20)} color={g.white} />}
          >
            {loadingEducationalMaterials
              ? <ActivityIndicator color={g.white} />
              : educationalMaterials?.slice(0, 1).map(() => (
                // : educationalMaterials?.slice(0, 1).map((item: any) => ( // TODO: update type
                null
                // <EducationalMaterialCard
                //   key={item.id}
                //   data={item}
                // />
              ))}
          </MyHealthBlock>
        </ScrollView>
      </MaskedView>
    </Screen>
  );
}
