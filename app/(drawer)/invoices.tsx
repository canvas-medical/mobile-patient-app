import { ListView } from '@components';
import { g } from '@styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDocumentReferences } from '@services';

export default function Invoices() {
  const { data: invoices, isFetching } = useDocumentReferences('invoicefull');
  const icon = <FontAwesome5 name="file-invoice-dollar" size={g.size(36)} color="white" />;

  return (
    <ListView clickable icon={icon} items={invoices?.entry || []} title="Invoices" isFetching={isFetching} />
  );
}
