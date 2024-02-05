import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDiagnosticURI } from '@services';
import { formatDate } from '@utils';
import { DiagnosticReport, LabImagingReport, LabReport } from '@interfaces';
import { CardContainer } from '@components/card-container';
import { g } from '@styles';

const s = StyleSheet.create({
  chevron: {
    left: g.ms(8),
    bottom: g.ms(4),
  },
  date: {
    ...g.bodySmall,
    color: g.neutral600,
    alignSelf: 'flex-end',
  },
  displayText: {
    flex: 1,
    ...g.labelMedium,
    color: g.neutral900,
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
      date: report.date ?? '',
      display: report.type?.coding ? report.type?.coding[0]?.display ?? '' : '',
      status: report.status ?? 'current',
      uri: report.content ? report.content[0]?.attachment?.url ?? '' : '',
    };
  } else {
    data = {
      id: report.id,
      date: report.issued ?? '',
      display: `${report.code?.text ?? ''} - ${report.category ? report.category[0]?.coding[0]?.display ?? '' : ''}`,
      status: report.status ?? 'current',
      uri: diagnosticURI ?? ''
    };
  }

  return (
    <CardContainer
      onPress={() => {
        if (data?.uri) {
          router.push({
            pathname: 'pdf-modal',
            params: { uri: data?.uri }
          });
        } else Alert.alert('There is no viewable data for this report.');
      }}
    >
      <View style={s.row}>
        <Text style={s.displayText}>
          {data?.display}
        </Text>
        {isDiagnosticData && isLoadingDiagnosticURI && <ActivityIndicator color={g.primaryBlue} size="small" />}
        {isDiagnosticData && !isLoadingDiagnosticURI && !!data?.uri
          ? <Feather name="chevron-right" size={g.ms(28)} color={g.neutral700} style={s.chevron} />
          : !isLoadingDiagnosticURI && <MaterialCommunityIcons name="note-off-outline" size={g.ms(20)} color={g.neutral600} />
        }
      </View>
      <Text style={s.date}>
        {formatDate(data?.date)}
      </Text>
    </CardContainer>
  );
}
