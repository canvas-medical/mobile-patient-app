import { useCommunication, useDocumentReferences, useObservations, usePaymentNotices, useRecords } from '@services';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DiagnosticCard, VitalCard } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: g.size(16),
    paddingBottom: g.size(120),
    gap: g.size(24),
  },
  diagnosticContainer: {
    rowGap: g.size(16),
  },
  label: {
    ...g.titleXSmall,
    color: g.white,
  },
  sectionContainer: {
    flex: 1,
    gap: g.size(16),
  },
  vitalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: g.size(16),
    justifyContent: 'space-between',
  },
});

const recordsData = Array.from(
  new Set([
    {
      id: 1,
      date: '2023-11-20T10:00:00',
      type: 'Blood Pressure',
      value: '120/80',
    },
    {
      id: 2,
      date: '2023-11-01T11:30:00',
      type: 'Heart Rate',
      value: '80',
    },
    {
      id: 3,
      date: '2023-11-22T14:15:00',
      type: 'Temperature',
      value: '98.6',
    },
    {
      id: 4,
      date: '2023-11-23T16:45:00',
      type: 'Blood Sugar',
      value: '100',
    },
    {
      id: 5,
      date: '2023-11-24T09:30:00',
      type: 'Oxygen Level',
      value: '95',
    },
  ]),
);
const diagnosticsData = Array.from(
  new Set([
    {
      id: 1,
      date: '2023-11-20T10:00:00',
      type: 'Radiology',
      value: 'XRAY, knee; 3 views',
    },
    {
      id: 2,
      date: '2023-11-25T14:30:00',
      type: 'Lab Test',
      value: 'Complete Blood Count',
    },
    {
      id: 3,
      date: '2023-11-26T09:00:00',
      type: 'Radiology',
      value: 'MRI, brain; w/o contrast',
    },
    {
      id: 4,
      date: '2023-11-27T16:45:00',
      type: 'Endoscopy',
      value: 'Colonoscopy; w/ biopsy, polypectomy',
    },
    {
      id: 5,
      date: '2023-11-28T11:30:00',
      type: 'Radiology',
      value: 'CT, abdomen and pelvis; w/ contrast',
    },
  ]),
);

export default function Dashboard() {
  const { data: diagnosticReport } = useRecords('DiagnosticReport');
  const { data: goals } = useRecords('Goal');
  const { data: documentReferences } = useDocumentReferences();
  const { data: invoices } = useDocumentReferences('invoicefull');
  const { data: messages } = useCommunication();
  const { data: paymentNotices } = usePaymentNotices();
  const { data: observations } = useObservations();

  console.log('Diagnostic Report: ', diagnosticReport);
  console.log('Goals: ', goals);
  console.log('Document References: ', documentReferences);
  console.log('Invoices: ', invoices);
  console.log('Messages: ', messages);
  console.log('Payment Notices: ', paymentNotices);
  console.log('Observations: ', observations);

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.contentContainer}
    >
      {recordsData.length > 0 && (
        <View style={s.sectionContainer}>
          <Text style={s.label}>
            Vitals
          </Text>
          <View style={s.vitalsContainer}>
            {recordsData.map((vital, i) => (
              <VitalCard
                i={i}
                key={vital.id}
                vital={vital}
                vitalsOdd={recordsData.length % 2 !== 0}
              />
            ))}
          </View>
        </View>
      )}
      {diagnosticsData.length > 0 && (
        <View style={s.sectionContainer}>
          <Text style={s.label}>
            Diagnostics
          </Text>
          <View style={s.diagnosticContainer}>
            {diagnosticsData.map((data) => <DiagnosticCard key={data.id} data={data} />)}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
