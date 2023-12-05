import { StyleSheet, View, Text } from 'react-native';
import { g } from '@styles';
import { ReportCard } from '@components';
import { useReports } from '@services';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  section: {
    gap: g.size(16),
  },
});

export function ReportsList() {
  const { data: reports } = useReports();
  console.log('LABS: ', reports);

  const currentReports = reports.filter((report) => report.status === 'current');
  const supersededReports = reports.filter((report) => report.status === 'superseded');
  return (
    <>
      {currentReports.length > 0 && (
        <View style={s.section}>
          <Text style={s.label}>
            Current
          </Text>
          {currentReports.map((report) => <ReportCard key={report.id} report={report} />)}
        </View>
      )}
      {supersededReports.length > 0 && (
        <View style={s.section}>
          <Text style={s.label}>
            Superseded
          </Text>
          {supersededReports.map((report) => <ReportCard key={report.id} report={report} />)}
        </View>
      )}
    </>
  );
}
