import { FontAwesome5 } from '@expo/vector-icons';
import { useInvoices } from '@services';
import { Invoice } from '@interfaces';
import { InvoiceCard, StackListView } from '@components';
import { g } from '@styles';

export default function Billing() {
  const { data, isLoading, refetch } = useInvoices();
  return (
    <StackListView
      title="Billing"
      icon={<FontAwesome5 name="file-invoice-dollar" size={g.size(36)} color="white" />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data?.length > 0 && data.map((invoice: Invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
        />
      ))}
    </StackListView>
  );
}
