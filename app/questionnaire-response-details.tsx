import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView, ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useQuestionnaireResponse } from '@services';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  answer: {
    ...g.bodyLarge,
    flex: 1,
    color: g.neutral900,
  },
  container: {
    flex: 1,
    backgroundColor: g.tertiaryBlue,
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.66,
    aspectRatio: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: g.size(36),
  },
  lineLabel: {
    ...g.titleXSmall,
    color: g.neutral900,
    lineHeight: g.size(20),
  },
  qaRow: {
    flexDirection: 'row',
    gap: g.size(12),
  },
  question: {
    ...g.bodyLarge,
    flex: 1,
    color: g.neutral600,
  },
  questionContainer: {
    gap: g.size(8),
    paddingVertical: g.size(20),
  },
  questionContainerBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: g.neutral300,
  },
  scroll: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
  },
  scrollContent: {
    flexGrow: 1,
    padding: g.size(24),
  },
  title: {
    textAlign: 'right',
    ...g.titleLarge,
  },
});

export default function QuestionnaireResponseDetails() {
  const params = useLocalSearchParams();
  const { responseId } = params;
  const { data, isLoading } = useQuestionnaireResponse(responseId as string);
  return (
    <View style={s.container}>
      <Image
        style={s.graphic}
        source={graphic}
        contentFit="fill"
      />
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather
            name="arrow-left"
            size={g.size(36)}
            color={g.white}
          />
        </TouchableOpacity>
        <Text style={s.title}>
          Completed Questionnaire
        </Text>
      </View>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
      >
        {isLoading
          ? <ActivityIndicator />
          : (
            <>
              {data?.item.map(({ answer, text }, i) => (
                <View
                  style={[
                    s.questionContainer,
                    i !== data.item.length - 1 && s.questionContainerBottomBorder,
                  ]}
                >
                  <View style={s.qaRow}>
                    <Text style={s.lineLabel}>
                      Q:
                    </Text>
                    <Text style={s.question}>
                      {text}
                    </Text>
                  </View>
                  <View style={s.qaRow}>
                    <Text style={s.lineLabel}>
                      A:
                    </Text>
                    <Text style={s.answer}>
                      {answer[0].valueCoding?.display || answer[0].valueString}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )
        }
      </ScrollView>
    </View>
  );
}
