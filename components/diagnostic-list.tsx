import { StyleSheet, Text, View } from 'react-native';
import { DiagnosticReport } from '@interfaces';
import { DiagnosticCard } from '@components'; // TODO - Revisit this to prevent circular dependency and excessive imports
import { g } from '@styles';

const s = StyleSheet.create({
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
});

export function DiagnosticList({ diagnostics }: { diagnostics: DiagnosticReport[] }) {
  return (
    <View style={s.sectionContainer}>
      <Text style={s.label}>
        Labs
      </Text>
      <View style={s.diagnosticContainer}>
        {diagnostics.map((data) => <DiagnosticCard key={data.id} data={data} />)}
      </View>
    </View>
  );
}
