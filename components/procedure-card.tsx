import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from '@utils';
import { Procedure } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  blurContainer: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
  },
  procedureDate: {
    ...g.bodySmall,
    color: g.white,
  },
  procedureType: {
    ...g.labelMedium,
    color: g.white,
  },
});

export function ProcedureCard({ procedure }: { procedure: Procedure, }) {
  const { code, performedDateTime } = procedure;
  const codeDisplay = code?.coding[0]?.display;

  return (
    <View style={s.blurContainer}>
      <BlurFill />
      <Text
        style={s.procedureType}
        numberOfLines={1}
      >
        {codeDisplay}
      </Text>
      <Text style={s.procedureDate}>
        {formatDate(performedDateTime)}
      </Text>
    </View>
  );
}

export function ProcedureSkeleton() {
  return (
    <View
      style={[s.blurContainer, { height: g.size(48) }]}
    >
      <BlurFill />
    </View>
  );
}
