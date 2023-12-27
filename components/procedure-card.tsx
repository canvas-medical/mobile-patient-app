import { StyleSheet, Text, View } from 'react-native';
import { BlurFill } from '@components';
import { Procedure } from '@interfaces';
import { g } from '@styles';

const s = StyleSheet.create({
  blurContainer: {
    borderRadius: g.size(8),
    overflow: 'hidden',
    padding: g.size(12),
    gap: g.size(4),
  },
  procedureDate: {
    ...g.labelSmall,
    color: g.white,
  },
  procedureType: {
    ...g.labelSmall,
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
        {new Date(performedDateTime).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
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
