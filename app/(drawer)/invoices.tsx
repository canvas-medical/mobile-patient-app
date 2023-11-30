/* eslint-disable react-native/no-inline-styles */ // REMOVE ME
import { ListView } from '@components';
import { g } from '@styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { DocumentResource } from '@interfaces';
import { useDocumentReferences } from '@services';

export default function Invoices() {
  const { data: invoices, isFetching } = useDocumentReferences('http://loinc.org|94093-2');
  // const { data: allDocs } = useDocumentReferences();
  console.log(invoices);

  console.log('Invoices: ', invoices);
  const icon = <FontAwesome5 name="file-invoice-dollar" size={g.size(36)} color="white" />;

  return (

    <ListView clickable icon={icon} items={invoices?.entry || []} title="Invoices" isFetching={isFetching} />
  );
}
