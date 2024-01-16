import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@utils';
import { QuestionnaireResponse } from '@interfaces';
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
  chevron: {
    left: g.size(8),
    bottom: g.size(4),
  },
  date: {
    ...g.bodySmall,
    color: g.white,
    alignSelf: 'flex-end',
  },
  displayText: {
    flex: 1,
    ...g.labelMedium,
    color: g.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

// eslint-disable-next-line no-undef
export function QuestionnaireResponseCard({ response }: { response: QuestionnaireResponse }) {
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => {
        router.push({
          pathname: 'questionnaire-response-details',
          params: { responseId: response.id }
        });
      }}
    >
      <BlurFill />
      <View style={s.row}>
        <Text style={s.displayText}>
          {response.item[0].text}
        </Text>
        <Feather name="chevron-right" size={g.size(28)} color={g.white} style={s.chevron} />
      </View>
      <Text style={s.date}>
        {formatDate(response.authored)}
      </Text>
    </TouchableOpacity>
  );
}

export function LabReportSkeleton() {
  return (
    <View style={s.card}>
      <BlurFill />
    </View>
  );
}
