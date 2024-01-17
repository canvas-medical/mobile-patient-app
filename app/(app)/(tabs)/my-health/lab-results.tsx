import { FontAwesome5 } from '@expo/vector-icons';
import { useLabResults } from '@services';
import { LabImagingReport, DiagnosticReport } from '@interfaces';
import { LabReportCard, StackListView } from '@components';
import { g } from '@styles';

export default function LabResults() {
  const { data, isLoading, refetch } = useLabResults();

  return (
    <StackListView
      title="Lab Results"
      icon={<FontAwesome5 name="vial" size={g.size(36)} color={g.neutral700} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data?.length > 0 && data?.map((report: LabImagingReport | DiagnosticReport) => (
        <LabReportCard
          key={report.id}
          report={report}
        />
      ))}
    </StackListView>
  );
}
