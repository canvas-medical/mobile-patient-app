import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { QuestionnaireIds, useQuestionnaire, useQuestionnaireSubmit } from '@services';
import { Question } from '@interfaces';
import { OnboardingScreen, Button, Input } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: g.size(24),
  },
  loading: {
    flex: 1,
    paddingBottom: g.size(120),
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
    <OnboardingScreen
      title="Questionnaires"
      subGreeting="Please answer the required questions below"
    >
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
    </OnboardingScreen>
  );
}
