import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useDiagnosticURI } from '@services';
import { formatDate } from '@utils';
import { DiagnosticReport, LabImagingReport, LabReport } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
  },
  chevron: {
    left: g.size(8),
    bottom: g.size(4),
  },
  date: {
    ...g.bodySmall,
    color: g.white,
    alignSelf: 'flex-end',
  },
  displayText: {
    flex: 1,
    ...g.labelMedium,
    color: g.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export function LabReportCard({ report }: { report: LabImagingReport | DiagnosticReport }) {
  let data = {} as LabReport;
  const isDiagnosticData = report.resourceType === 'DiagnosticReport';
  const { data: diagnosticURI, isLoading: isLoadingDiagnosticURI } = useDiagnosticURI(isDiagnosticData ? report.id : null);
  if ('type' in report) {
    data = {
      id: report.id,
      date: report.date,
      display: report.type.coding[0].display,
      status: report.status,
      uri: report.content[0].attachment.url,
    };
  } else {
    data = {
      id: report.id,
      date: report.issued,
      display: `${report.code.text} - ${report.category[0].coding[0].display}`,
      status: report.status,
      uri: diagnosticURI
    };
  }

  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => {
        if (data.uri) {
          router.push({
            pathname: 'pdf-modal',
            params: { uri: data.uri }
          });
        } else Alert.alert('There is no viewable data for this report.');
      }}
    >
      <BlurFill />
      <View style={s.row}>
        <Text style={s.displayText}>
          {data.display}
        </Text>
        {isDiagnosticData && isLoadingDiagnosticURI
          ? <ActivityIndicator color={g.white} />
          : !!data.uri && <Feather name="chevron-right" size={g.size(28)} color={g.white} style={s.chevron} />}
      </View>
      <Text style={s.date}>
        {formatDate(data.date)}
      </Text>
    </TouchableOpacity>
  );
}

export function LabReportSkeleton() {
  return (
    <View style={s.card}>
      <BlurFill />
    </View>
  );
}
