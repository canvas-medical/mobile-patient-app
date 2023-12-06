import { useState } from 'react';
import { useObservations, useDiagnostics, useReports } from '@services';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { DiagnosticList, LabeledToggle, VitalsGrid, ReportList } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: g.size(16),
    paddingBottom: g.size(120),
    gap: g.size(24),
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
});

export default function MetricsAndReports() {
  const [toggled, setToggled] = useState(false);
  const { data: reports, isLoading: loadingReports } = useReports();
  const { data: diagnostics, isLoading: loadingDiagnostics } = useDiagnostics();
  const { data: observations, isLoading: loadingObservations } = useObservations();

  return (
    <View style={s.container}>
      <LabeledToggle
        toggled={toggled}
        setToggled={setToggled}
        optionOne="Metrics"
        optionTwo="Reports"
      />
      {(toggled && loadingReports) || (!toggled && (loadingObservations || loadingDiagnostics)) ? (
        <ActivityIndicator size="large" color={g.white} style={s.loading} />
      ) : (
        <ScrollView
          style={s.container}
          contentContainerStyle={s.contentContainer}
        >
          {toggled ? <ReportList reports={reports} /> : (
            <>
              {observations.length > 0 && <VitalsGrid vitals={observations} />}
              {diagnostics.length > 0 && <DiagnosticList diagnostics={diagnostics} />}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}
