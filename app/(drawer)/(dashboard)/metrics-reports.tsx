import { useState } from 'react';
import {
  useCommunication,
  useDocumentReferences,
  useObservations,
  usePaymentNotices,
  useReports,
} from '@services';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DiagnosticList, LabeledToggle, VitalsGrid, ReportsList } from '@components';
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
});

const vitalsData = Array.from(
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
const reportsData = Array.from(
  new Set([
    {
      id: 1,
      date: '2023-11-20T10:00:00',
      type: 'Lab Test',
      status: 'superseded',
    },
    {
      id: 2,
      date: '2023-11-25T14:30:00',
      type: 'Lab Test',
      status: 'superseded',
    },
    {
      id: 3,
      date: '2023-11-26T09:00:00',
      type: 'Lab Test',
      status: 'superseded',
    },
    {
      id: 4,
      date: '2023-11-27T16:45:00',
      type: 'Lab Test',
      status: 'superseded',
    },
    {
      id: 5,
      date: '2023-11-28T11:30:00',
      type: 'Lab Test',
      status: 'current',
    },
  ]),
);

export default function Dashboard() {
  const [toggled, setToggled] = useState(false);
  // const { data: diagnosticReport } = useReports('DiagnosticReport');
  // const { data: goals } = useReports('Goal');
  // const { data: documentReferences } = useDocumentReferences();
  // const { data: invoices } = useDocumentReferences('invoicefull');
  // const { data: messages } = useCommunication();
  // const { data: paymentNotices } = usePaymentNotices();
  // const { data: observations } = useObservations();

  // console.log('Diagnostic Report: ', diagnosticReport);
  // console.log('Goals: ', goals);
  // console.log('Document References: ', documentReferences);
  // console.log('Invoices: ', invoices);
  // console.log('Messages: ', messages);
  // console.log('Payment Notices: ', paymentNotices);
  // console.log('Observations: ', observations);

  return (
    <View style={s.container}>
      <LabeledToggle
        toggled={toggled}
        setToggled={setToggled}
        optionOne="Metrics"
        optionTwo="Reports"
      />
      <ScrollView
        style={s.container}
        contentContainerStyle={s.contentContainer}
      >
        {toggled ? <ReportsList /> : (
          <>
            {vitalsData.length > 0 && <VitalsGrid vitals={vitalsData} />}
            {diagnosticsData.length > 0 && <DiagnosticList diagnostics={diagnosticsData} />}
          </>
        )}
      </ScrollView>
    </View>
  );
}
