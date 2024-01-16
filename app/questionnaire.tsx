import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { QuestionnaireIds, useQuestionnaire, useQuestionnaireSubmit } from '@services';
import { Question } from '@interfaces';
import { Button, Input } from '@components';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.primaryBlue,
  },
  contentContainer: {
    flex: 1,
    padding: g.size(36),
    justifyContent: 'space-between',
    gap: g.size(36),
  },
  formContainer: {
    flex: 1,
    gap: g.size(24),
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.width * 0.66,
    aspectRatio: 1,
  },
  greeting: {
    ...g.labelXLarge,
    color: g.black,
  },
  header: {
    gap: g.size(16),
    padding: g.size(36),
    paddingTop: g.size(72),
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
  },
  scroll: {
    flex: 1,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
  },
  scrollContent: {
    flexGrow: 1,
  },
  subGreeting: {
    ...g.bodyMedium,
    color: g.neutral300,
    marginTop: g.size(2),
  },
  title: {
    ...g.titleLarge,
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
          Questionnaires
        </Text>
      </View>
      <KeyboardAvoidingView
        style={s.scroll}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={s.contentContainer}>
              <View>
                <Text style={s.greeting}>
                  Welcome
                </Text>
                <Text style={s.subGreeting}>
                  Fill answer the required questions below
                </Text>
              </View>
              {isFetching
                ? <ActivityIndicator size="large" color={g.primaryBlue} style={s.loading} />
                : (
                  <View style={s.formContainer}>
                    {questionnaire?.item.map((question: Question) => (
                      <Controller
                        name={question.linkId}
                        control={control}
                        rules={{ required: { value: question.type === 'choice', message: 'Required' } }}
                        key={question.linkId}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            placeholder={question.type === 'choice' ? 'Make a selection' : 'Enter text'}
                            buttonText={question.type === 'choice' ? 'Select' : null}
                            type={dataTypeMap[question.type]}
                            name={question.text}
                            label={question.type === 'choice' ? question.text : `${question.text} (optional)`}
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
                  </View>
                )}
              {/* <Button
                onPress={handleSubmit((data: any) => {
                  actions.updateAction(data);
                  router.push('contact-information');
                })}
                label="Continue"
                theme="primary"
              /> */}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
