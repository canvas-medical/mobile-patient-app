import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { formatDate } from '@utils';
import { QuestionnaireResponse } from '@interfaces';
import { CardContainer } from '@components/card-container';
import { g } from '@styles';

const s = StyleSheet.create({
  chevron: {
    left: g.ms(8),
    bottom: g.ms(4),
  },
  date: {
    ...g.bodySmall,
    color: g.neutral600,
    alignSelf: 'flex-end',
  },
  displayText: {
    flex: 1,
    ...g.labelMedium,
    color: g.neutral900,
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
    <CardContainer
      onPress={() => {
        router.push({
          pathname: 'questionnaire-response-details',
          params: { responseId: response.id }
        });
      }}
    >
      <View style={s.row}>
        <Text style={s.displayText}>
          {response.item[0].text}
        </Text>
        <Feather name="chevron-right" size={g.ms(28)} color={g.neutral700} style={s.chevron} />
      </View>
      <Text style={s.date}>
        {formatDate(response.authored)}
      </Text>
    </CardContainer>
  );
}
