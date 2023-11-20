import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform, ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Screen, Input, Button } from '@components';
import { g } from '@styles';
import { QuestionnaireIds, useQuestionnaire, useQuestionnaireSubmit } from '@services';
import { Question } from '@interfaces/question';
import { Controller, useForm } from 'react-hook-form';

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
  const { isFetching, data: questionnaire } = useQuestionnaire(QuestionnaireIds['Alcohol, Tobacco, and Other Substances']);
  const { mutate: onQuestionnaireSubmit, isPending } = useQuestionnaireSubmit();
  const dataTypeMap = {
    choice: 'selector',
    text: 'text'
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<any>({
    shouldFocusError: false,
  });

  return (
    <Screen>
      <View style={s.scrollCover} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
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
                    {isFetching
                      ? <ActivityIndicator style={{ flex: 1 }} />
                      : (
                        <>
                          {questionnaire.item.map((question: Question) =>
                            (
                              <Controller
                                name={question.linkId}
                                control={control}
                                rules={{ required: { value: question.type === 'choice', message: 'Required' } }}
                                key={question.linkId}
                                render={({ field: { onChange, value } }) => (
                                  <Input
                                    type={dataTypeMap[question.type]}
                                    name={question.text}
                                    label={question.text}
                                    options={question.answerOption.map((answer) => (
                                      { label: answer.valueCoding.display, value: answer.valueCoding.code }))}
                                    onFocus={() => clearErrors()}
                                    onChange={(e) => { console.log(e, value); onChange(e); }}
                                    value={value}
                                    error={errors[question.linkId]}
                                  />
                                )}
                              />
                            ))}
                          <Button
                            onPress={handleSubmit((data) => onQuestionnaireSubmit({ formData: data, questionnaireData: questionnaire }))}
                            label={isPending ? 'Submitting...' : 'Submit'}
                            theme="primary"
                          />
                        </>
                      )
                        }
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
