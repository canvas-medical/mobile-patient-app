import { StyleSheet, Text, View } from 'react-native';
import { capitalizeFirstCharacter, formatDate } from '@utils';
import { Procedure } from '@interfaces';
import { BlurFill, ExplainButton } from '@components';
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
    alignSelf: 'flex-end',
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
    <ExplainButton
      style={s.blurContainer}
      id={procedure.id}
      resourceType={procedure.resourceType}
      codes={procedure.code.coding}
      description={procedure.code.coding[0].display}
    >
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
    </ExplainButton>
  );
}

export function ProcedureSkeleton() {
  return (
    <View style={[s.blurContainer, { height: g.size(48) }]}>
      <BlurFill />
    </View>
  );
}
