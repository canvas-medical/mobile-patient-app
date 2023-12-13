import { Entypo } from '@expo/vector-icons';
import { useLabResults } from '@services';
import { DiagnosticCard, LabImagingReportCard, StackListView } from '@components';
import { g } from '@styles';
import { LabImagingReport, DiagnosticReport } from '@interfaces';

export default function LabResults() {
  const { data, isLoading, refetch } = useLabResults();

  return (
    <StackListView
      title="Lab Results"
      icon={<Entypo name="lab-flask" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data?.length > 0 && data.map((report: LabImagingReport | DiagnosticReport) => {
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
    </StackListView>
  );
}
