import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useProcedures } from '@services';
import { ProcedureCard, StackListView } from '@components';
import { Procedure } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  label: {
    ...g.titleXSmall,
    color: g.white,
    marginLeft: g.size(4),
  },
  scrollSection: {
    gap: g.size(16),
  },
});

export default function Procedures() {
  const { data, isLoading, refetch } = useProcedures();

  return (
    <StackListView
      title="Procedures"
      icon={<FontAwesome5 name="procedures" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {data.map((procedure: Procedure) => (
        <ProcedureCard
          key={procedure.id}
          procedure={procedure}
        />
      ))}
    </StackListView>
  );
}
