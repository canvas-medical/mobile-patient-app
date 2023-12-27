import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform, ActivityIndicator, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { Question } from '@interfaces';
import { QuestionnaireIds, useQuestionnaire, useQuestionnaireSubmit } from '@services';
import { Screen, Input, Button } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    padding: g.size(36),
    justifyContent: 'space-between',
    gap: g.size(48),
  },
  formContainer: {
    flex: 1,
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
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={s.container}>
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
                  {isFetching
                    ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
                    : (
                      <>
                        {questionnaire?.item.map((question: Question) => (
                          <Controller
                            name={question.linkId}
                            control={control}
                            rules={{ required: { value: question.type === 'choice', message: 'Required' } }}
                            key={question.linkId}
                            render={({ field: { onChange, value } }) => (
                              <Input
                                placeholder={question.type === 'choice' ? 'Make a selection' : 'Enter text'}
                                type={dataTypeMap[question.type]}
                                name={question.text}
                                label={question.text}
                                options={question.answerOption.map((answer) => (
                                  { label: answer.valueCoding.display, value: answer.valueCoding.code }))}
                                onFocus={() => clearErrors()}
                                onChange={(e) => onChange(e)}
                                value={value}
                                error={errors[question.linkId] as FieldError}
                              />
                            )}
                          />
                        ))}
                        <Button
                          onPress={handleSubmit((data) => onQuestionnaireSubmit({ formData: data, questionnaireData: questionnaire }))}
                          disabled={isPending}
                          label={isPending ? 'Submitting...' : 'Submit'}
                          theme="primary"
                        />
                      </>
                    )
                  }
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
