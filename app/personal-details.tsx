import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { Button, Screen, Input } from '@components';
import { useCreatePatient } from '@services';
import { g } from '@styles';

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

type FormData = {
  preferredName: string
  firstName: string
  middleName: string
  lastName: string
  phone: string
  email: string
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
      phone: null,
      email: null,
      gender: null,
      birthSex: null,
      birthDate: new Date().toISOString().slice(0, 10),
    },
    shouldFocusError: false,
  });
  const { mutate: onCreatePatient, isPending } = useCreatePatient();

  return (
    <Screen>
      <View style={s.scrollCover} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
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
                Personal Details
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
                  <Controller
                    name="preferredName"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        type="text"
                        name="preferredName"
                        label="Preferred Name (optional)"
                        placeholder="Enter your preferred name"
                        onFocus={() => clearErrors}
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
                        onSubmitEditing={() => setFocus('email')}
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
                    name="email"
                    control={control}
                    rules={{
                      required: { value: true, message: 'Required' },
                      validate: (value) => {
                        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!regex.test(value)) return 'Please enter a valid email address';
                        return true;
                      }
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        onFocus={() => clearErrors()}
                        onChange={onChange}
                        value={value}
                        onSubmitEditing={() => setFocus('phone')}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        returnKeyType="next"
                        forwardedRef={ref}
                        error={errors.email}
                      />
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: { value: true, message: 'Required' },
                      validate: (value) => {
                        const regex = /^\(\d{3}\) \d{3}-\d{4}$/;
                        if (!regex.test(value)) return 'Please enter a valid phone number';
                        return true;
                      }
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Input
                        type="text"
                        name="phone"
                        label="Phone"
                        placeholder="Enter your phone number"
                        onFocus={() => clearErrors()}
                        onChange={onChange}
                        value={value}
                        onSubmitEditing={() => null}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        returnKeyType="next"
                        forwardedRef={ref}
                        error={errors.phone}
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
                  onPress={handleSubmit((data) => onCreatePatient(data))}
                  label={isPending ? 'Registering...' : 'Register'}
                  theme="primary"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
