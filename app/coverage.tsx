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
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useCreateCoverage, Insurers } from '@services';
import { Button, Input } from '@components';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  buttonContainer: {
    gap: g.size(16),
  },
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
    color: g.neutral900,
  },
  header: {
    gap: g.size(16),
    padding: g.size(36),
    paddingTop: g.size(72),
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
    color: g.neutral400,
    marginTop: g.size(2),
  },
  title: {
    ...g.titleLarge,
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
          Coverage
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
                  Please fill out your insurance information
                </Text>
              </View>
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
                      onChange={onChange}
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
                  onPress={handleSubmit((data: any) => onCreateCoverage(data))} // TODO: Type
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
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
