import { useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useObservations, useDiagnostics, useReports } from '@services';
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
  const { data: reports, isLoading: loadingReports, refetch: refetchReports } = useReports();
  const { data: diagnostics, isLoading: loadingDiagnostics, refetch: refetchDiagnostics } = useDiagnostics();
  const { data: observations, isLoading: loadingObservations, refetch: refetchObservations } = useObservations();
  const [toggled, setToggled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (toggled) await refetchReports();
    else {
      await refetchObservations();
      await refetchDiagnostics();
    }
    setRefreshing(false);
  };

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
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={g.white}
              colors={[g.white]}
            />
          )}
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
