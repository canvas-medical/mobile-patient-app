import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView, ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useQuestionnaireResponse } from '@services';
import { Screen } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  answer: {
    ...g.bodySmall,
    color: g.black,
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    padding: g.size(36),
    gap: g.size(24),
  },
  header: {
    padding: g.size(36),
    paddingTop: g.size(72),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  question: {
    ...g.bodyMedium,
    fontWeight: 'bold',
    color: g.black,
    opacity: 0.9,
  },
  questionContainer: {
    gap: g.size(12),
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollCover: {
    width: g.width,
    height: g.height * 0.6,
    backgroundColor: g.white,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    ...g.titleLarge,
    textAlign: 'right',
  },
});

export default function QuestionnaireResponseDetails() {
  const params = useLocalSearchParams();
  const { responseId } = params;
  const { data, isLoading } = useQuestionnaireResponse(responseId as string);
  return (
    <Screen>
      <View style={s.scrollCover} />
      <ScrollView contentContainerStyle={s.scrollContent}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather
              name="arrow-left"
              size={g.size(36)}
              color={g.white}
            />
          </TouchableOpacity>
          <Text style={s.title}>
            Questionnaire Response
          </Text>
        </View>
        {isLoading ? <ActivityIndicator />
          : (
            <View style={s.contentContainer}>
              {data?.item.map(({ answer, text }) => (
                <View style={s.questionContainer}>
                  <Text style={s.question}>{text}</Text>
                  <Text style={s.answer}>{answer[0].valueCoding?.display || answer[0].valueString}</Text>
                </View>
              ))}
            </View>
          )
        }
      </ScrollView>
    </Screen>
  );
}
