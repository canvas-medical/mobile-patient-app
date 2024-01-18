import { StyleSheet, View, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useCreateCoverage, Insurers } from '@services';
import { OnboardingScreen, Button, Input } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    gap: g.size(16),
  },
  formContainer: {
    flex: 1,
    gap: g.size(24),
  },
});

type FormData = {
  insurer: string
  memberID: string
  groupNumber?: string
}
export default function Coverage() {
  const {
    control,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      insurer: null,
      memberID: null,
      groupNumber: null,
    },
    shouldFocusError: false,
  });
  const { mutate: onCreateCoverage, isPending } = useCreateCoverage();

  return (
    <OnboardingScreen
      title="Coverage"
      subGreeting="Please fill out your insurance information"
    >
      <View style={s.formContainer}>
        <Controller
          name="insurer"
          control={control}
          rules={{ required: { value: true, message: 'Required' } }}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="selector"
              buttonText="Select"
              name="insurer"
              label="Insurance Provider"
              placeholder="Select your insurance provider"
              onFocus={() => clearErrors()}
              options={Object.keys(Insurers)}
              onChange={(newValue) => { if (newValue !== 'Select One') onChange(newValue); }}
              value={value}
              forwardedRef={ref}
              error={errors.insurer}
            />
          )}
        />
        <Controller
          name="memberID"
          control={control}
          rules={{ required: { value: true, message: 'Required' } }}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="text"
              name="memberID"
              label="Member ID"
              placeholder="Enter your member ID"
              onFocus={() => clearErrors()}
              onChange={onChange}
              value={value}
              onSubmitEditing={() => setFocus('groupNumber')}
              autoCapitalize="words"
              keyboardType="default"
              textContentType="none"
              returnKeyType="next"
              forwardedRef={ref}
              error={errors.memberID}
            />
          )}
        />
        <Controller
          name="groupNumber"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="text"
              name="groupNumber"
              label="Group Number (optional)"
              placeholder="Enter your group number"
              onFocus={() => clearErrors()}
              onChange={onChange}
              value={value}
              autoCapitalize="words"
              keyboardType="default"
              textContentType="none"
              returnKeyType="next"
              forwardedRef={ref}
              error={errors.groupNumber}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          )}
        />
      </View>
      <View style={s.buttonContainer}>
        <Button
          onPress={handleSubmit((data: FormData) => onCreateCoverage(data))}
          label={isPending ? 'Submitting...' : 'Submit'}
          theme="primary"
        />
        <Button
          onPress={() => router.push('consents')}
          label="Self-Pay"
          theme="secondary"
        />
      </View>
    </OnboardingScreen>
  );
}
