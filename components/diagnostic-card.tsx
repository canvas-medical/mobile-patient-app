import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { DiagnosticReport } from '@interfaces';
import { useDiagnosticURI } from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  blurContainer: {
    borderRadius: g.size(8),
    overflow: 'hidden',
  },
  contentRow: {
    flexDirection: 'row',
    gap: g.size(16),
  },
  dataContainer: {
    flex: 1,
    gap: g.size(2),
  },
  diagnosticBlur: {
    flex: 1,
    padding: g.size(12),
  },
  diagnosticData: {
    ...g.labelMedium,
    color: g.white,
  },
  diagnosticDate: {
    ...g.labelSmall,
    color: g.white,
    alignSelf: 'flex-end',
  },
  diagnosticType: {
    ...g.labelSmall,
    color: g.white,
  },
});

export function DiagnosticCard({ data }: { data: DiagnosticReport, }) {
  const { id, issued, code: { text }, category: [{ coding: [{ display }] }] } = data;
  const { data: uri } = useDiagnosticURI(id);

  return (
    <TouchableOpacity
      style={s.blurContainer}
      onPress={() =>
        router.push({
          pathname: 'pdf-modal',
          params: { uri }
        })}
    >
      <BlurView
        style={s.diagnosticBlur}
        tint="light"
        intensity={50}
      >
        <View style={s.contentRow}>
          <FontAwesome5 name="file-medical-alt" size={g.size(36)} color={g.white} />
          <View style={s.dataContainer}>
            <Text
              style={s.diagnosticData}
              numberOfLines={2}
            >
              {text}
            </Text>
            <Text
              style={s.diagnosticType}
              numberOfLines={1}
            >
              {display}
            </Text>
          </View>
          <Feather name="chevron-right" size={g.size(28)} color={g.white} />
        </View>
        <Text style={s.diagnosticDate}>
          {new Date(issued).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
}
