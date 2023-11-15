import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen } from '@components';
import { g } from '@styles';
import { QuestionnaireIds, useQuestionnaire, useQuestionnaireSubmit } from '@services';
import QuestionnaireForm from '@components/questionnaire-form';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    padding: g.size(36),
    justifyContent: 'space-between',
    gap: g.size(48),
  },
  formContainer: {
    flex: 1,
    gap: g.size(56),
  },
  formInputs: {
    gap: g.size(24),
  },
  greeting: {
    ...g.labelXLarge,
    color: g.black,
  },
  header: {
    padding: g.size(36),
    paddingTop: g.size(72),
  },
  scrollCover: {
    width: g.width,
    height: g.height * 0.6,
    backgroundColor: g.white,
    position: 'absolute',
    bottom: 0,
  },
  subGreeting: {
    ...g.bodyMedium,
    color: g.neutral300,
    marginTop: g.size(2),
  },
  title: {
    ...g.titleLarge,
    marginTop: g.size(16),
  },
});

export default function Questionnaire() {
  const { isFetching, data } = useQuestionnaire(QuestionnaireIds['Alcohol, Tobacco, and Other Substances']);
  const { mutate: onQuestionnaireSubmit, isPending } = useQuestionnaireSubmit();
  console.log('parent data', data?.item);

  return (
    <Screen>
      <View style={s.scrollCover} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={s.container}>
              <View style={s.header}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Feather
                    name="arrow-left"
                    size={g.size(36)}
                    color={g.white}
                  />
                </TouchableOpacity>
                <Text style={s.title}>
                  Questionnaires
                </Text>
              </View>
              <View style={s.contentContainer}>
                <View>
                  <Text style={s.greeting}>
                    Welcome
                  </Text>
                  <Text style={s.subGreeting}>
                    Fill out a few personal details to get started
                  </Text>
                </View>
                <View style={s.formContainer}>
                  <View style={s.formInputs}>
                    {(data?.item) && <QuestionnaireForm items={data.item} />}
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
