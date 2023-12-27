import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { Button, Screen, Input } from '@components';
import { useCreateCoverage, Insurers } from '@services';
import { g } from '@styles';

const s = StyleSheet.create({
  buttons: {
    gap: g.size(16),
  },
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    gap: g.size(56)
  },
  formInputs: {
    gap: g.size(24),
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
  title: {
    ...g.titleLarge,
    marginTop: g.size(16),
  },
});

type FormData = {
  insurer: string
  memberId: string
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
      memberId: null,
      groupNumber: null,
    },
    shouldFocusError: false,
  });
  const { mutate: onCreateCoverage, isPending } = useCreateCoverage();

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
                  Coverage
                </Text>
              </View>
              <View style={s.formContainer}>
                <View style={s.formInputs}>
                  <Controller
                    name="insurer"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        type="selector"
                        name="insurer"
                        label="Insurance Provider"
                        placeholder="Select your insurance provider"
                        onFocus={() => clearErrors}
                        options={Object.keys(Insurers)}
                        onChange={onChange}
                        value={value}
                        forwardedRef={ref}
                        error={errors.insurer}
                      />
                    )}
                  />
                  <Controller
                    name="memberId"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        type="text"
                        name="memberId"
                        label="Member ID"
                        placeholder="Enter your member ID"
                        onFocus={() => clearErrors}
                        onChange={onChange}
                        value={value}
                        onSubmitEditing={() => setFocus('groupNumber')}
                        autoCapitalize="words"
                        keyboardType="default"
                        textContentType="none"
                        returnKeyType="next"
                        forwardedRef={ref}
                        error={errors.memberId}
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
                        label="Group Number"
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
                <View style={s.buttons}>
                  <Button
                    onPress={handleSubmit((data) => onCreateCoverage(data))}
                    label={isPending ? 'Submitting...' : 'Submit'}
                    theme="primary"
                  />
                  <Button
                    onPress={() => router.push('consents')}
                    label="Self-Pay"
                    theme="secondary"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
