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
import { useStateMachine } from 'little-state-machine';
import { Button, Input } from '@components';
import { updateAction } from '@store';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: g.tertiaryBlue,
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
  preferredName: string
  firstName: string
  middleName: string
  lastName: string
  gender: string
  birthSex: string
  birthDate: string
}

export default function PersonalDetails() {
  const {
    control,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      preferredName: null,
      firstName: null,
      middleName: null,
      lastName: null,
      gender: null,
      birthSex: null,
      birthDate: null,
    },
    shouldFocusError: false,
  });
  const { actions } = useStateMachine({ updateAction });

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
          Personal Details
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
                  Fill out a few personal details to get started
                </Text>
              </View>
              <View style={s.formContainer}>
                <Controller
                  name="preferredName"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="text"
                      name="preferredName"
                      label="Preferred Name (optional)"
                      placeholder="Enter your preferred name"
                      onFocus={() => clearErrors()}
                      onChange={onChange}
                      value={value}
                      onSubmitEditing={() => setFocus('firstName')}
                      autoCapitalize="words"
                      keyboardType="default"
                      textContentType="nickname"
                      returnKeyType="next"
                      forwardedRef={ref}
                      error={errors.preferredName}
                    />
                  )}
                />
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: { value: true, message: 'Required' } }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="text"
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      onFocus={() => clearErrors()}
                      onChange={onChange}
                      value={value}
                      onSubmitEditing={() => setFocus('middleName')}
                      autoCapitalize="words"
                      keyboardType="default"
                      textContentType="givenName"
                      returnKeyType="next"
                      forwardedRef={ref}
                      error={errors.firstName}
                    />
                  )}
                />
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="text"
                      name="middleName"
                      label="Middle Name (optional)"
                      placeholder="Enter your middle name"
                      onFocus={() => clearErrors()}
                      onChange={onChange}
                      value={value}
                      onSubmitEditing={() => setFocus('lastName')}
                      autoCapitalize="words"
                      keyboardType="default"
                      textContentType="middleName"
                      returnKeyType="next"
                      forwardedRef={ref}
                      error={errors.middleName}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: { value: true, message: 'Required' } }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="text"
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      onFocus={() => clearErrors()}
                      onChange={onChange}
                      value={value}
                      onSubmitEditing={() => setFocus('gender')}
                      autoCapitalize="words"
                      keyboardType="default"
                      textContentType="familyName"
                      returnKeyType="next"
                      forwardedRef={ref}
                      error={errors.lastName}
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: { value: true, message: 'Required' } }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="selector"
                      name="gender"
                      label="Gender"
                      placeholder="Select your gender"
                      options={[
                        'Male',
                        'Female',
                        'Other',
                        'Unknown',
                      ]}
                      onFocus={() => clearErrors()}
                      onChange={onChange}
                      value={value}
                      forwardedRef={ref}
                      error={errors.gender}
                      buttonText="Select"
                    />
                  )}
                />
                <Controller
                  name="birthSex"
                  control={control}
                  rules={{ required: { value: true, message: 'Required' } }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="selector"
                      name="birthSex"
                      label="Sex at Birth"
                      placeholder="Sex at birth"
                      options={[
                        'Male',
                        'Female',
                        'Other',
                        'Unknown',
                      ]}
                      onFocus={() => clearErrors()}
                      onChange={onChange}
                      value={value}
                      error={errors.birthSex}
                      buttonText="Select"
                    />
                  )}
                />
                <Controller
                  name="birthDate"
                  control={control}
                  rules={{
                    validate: {
                      required: (value) => {
                        const today = new Date().toISOString().slice(0, 10);
                        if (today === value) return 'Required';
                        return true;
                      }
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="date-picker"
                      name="birthDate"
                      label="Date of Birth"
                      placeholder="Enter your date of birth"
                      iosSpinner
                      onFocus={() => clearErrors()}
                      value={value}
                      minimumDate={null}
                      maximumDate={new Date()}
                      onChange={onChange}
                      error={errors.birthDate}
                    />
                  )}
                />
              </View>
              <Button
                onPress={handleSubmit((data: any) => {
                  actions.updateAction(data);
                  router.push('contact-information');
                })}
                label="Continue"
                theme="primary"
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
