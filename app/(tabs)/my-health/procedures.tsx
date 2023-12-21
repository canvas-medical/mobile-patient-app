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
  const activeProcedures = data?.filter((procedure) => procedure.clinicalStatus.text === 'Active');
  const resolvedProcedures = data?.filter((procedure) => procedure.clinicalStatus.text === 'Resolved');

  return (
    <StackListView
      title="Procedures"
      icon={<FontAwesome5 name="heart-broken" size={g.size(36)} color={g.white} />}
      isLoading={isLoading}
      refetch={refetch}
    >
      {activeProcedures?.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Active
          </Text>
          {activeProcedures.map((procedure: Procedure) => (
            <ProcedureCard
              key={procedure.id}
              procedure={procedure}
            />
          ))}
        </View>
      )}
      {resolvedProcedures?.length > 0 && (
        <View style={s.scrollSection}>
          <Text style={s.label}>
            Resolved
          </Text>
          {resolvedProcedures.map((procedure: Procedure) => (
            <ProcedureCard
              key={procedure.id}
              procedure={procedure}
            />
          ))}
        </View>
      )}
    </StackListView>
  );
}
