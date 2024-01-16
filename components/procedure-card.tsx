import { StyleSheet, Text, View } from 'react-native';
import { capitalizeFirstCharacter, formatDate } from '@utils';
import { Procedure } from '@interfaces';
import { BlurFill } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  card: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    paddingVertical: g.size(12),
    paddingHorizontal: g.size(16),
    gap: g.size(4),
  },
  procedureDate: {
    ...g.bodySmall,
    color: g.black,
    alignSelf: 'flex-end',
  },
  procedureType: {
    ...g.labelMedium,
    color: g.black,
  },
});

export function ProcedureCard({ procedure }: { procedure: Procedure, }) {
  const { code, performedDateTime } = procedure;
  const codeDisplay = code?.coding[0]?.display;

  return (
    <View style={s.card}>
      <BlurFill />
      <Text
        style={s.procedureType}
        numberOfLines={3}
      >
        {capitalizeFirstCharacter(codeDisplay)}
      </Text>
      <Text style={s.procedureDate}>
        {formatDate(performedDateTime)}
      </Text>
    </View>
  );
}

export function ProcedureSkeleton() {
  return (
    <View style={[s.card, { height: g.size(48) }]}>
      <BlurFill />
    </View>
  );
}
