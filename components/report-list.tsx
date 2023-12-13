import { StyleSheet, View, Text } from 'react-native';
import { Report } from '@interfaces';
import { ReportCard } from '@components/lab-imaging-report-card'; // TODO - Revisit this to prevent circular dependency and excessive imports
import { g } from '@styles';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  section: {
    gap: g.size(16),
  },
});

export function ReportList({ reports }: { reports: Report[] }) {
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
