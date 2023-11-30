import { ListView } from '@components';
import { g } from '@styles';
import { Immunization } from '@interfaces';
import { Fontisto } from '@expo/vector-icons';
// import { useImmunizations } from '@services';

export default function Invoices() {
  // const { data: invoices, isFetching } = useDocumentReferences('http://loinc.org|94093-2');
  // const { data: allDocs } = useDocumentReferences();
  const immunizations = {
    entry: [{
      resourceType: 'Immunization', id: 'd9aefede-da05-4bef-bbf9-63bcf83c806a', status: 'completed', vaccineCode: { coding: [{ system: 'http://hl7.org/fhir/sid/cvx', code: '207', display: 'Moderna Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 50 mcg/0.25 mL dosage, for intramuscular use' }] }, patient: { reference: 'Patient/a1197fa9e65b4a5195af15e0234f61c2', type: 'Patient' }, occurrenceDateTime: '2022-05-26T18:55:34.629659+00:00', primarySource: false
    }]
  };
  const icon = <Fontisto name="injection-syringe" size={g.size(36)} color="black" />;

  return (
    <ListView clickable icon={icon} items={immunizations?.entry || []} title="Immunizations" isFetching={false} />
  );
}
