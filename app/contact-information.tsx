import { StyleSheet, View, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { americanStatesArray } from '@constants';
import { PatientProfileFormData } from '@interfaces';
import { useCreatePatient } from '@services';
import { OnboardingScreen, Button, Input } from '@components';
import { updateAction } from '@store';
import { g } from '@styles';

const s = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: g.hs(24),
  },
});

type FormData = {
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  stateAbbreviation: string
  postalCode: string
}

export default function ContactInformation() {
  const {
    control,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: null,
      phone: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      stateAbbreviation: null,
      postalCode: null,
    },
    shouldFocusError: false,
  });
  const { state: personalDetails, actions } = useStateMachine({ updateAction });
  const { mutate: onCreatePatient, isPending } = useCreatePatient();

  return (
    <OnboardingScreen
      title="Contact Information"
      subGreeting="Please fill out your contact information"
    >
      <View style={s.formContainer}>
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
              onSubmitEditing={() => setFocus('addressLine1')}
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
          name="addressLine1"
          control={control}
          rules={{ required: { value: true, message: 'Required' } }}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="text"
              name="addressLine1"
              label="Address"
              placeholder="Enter your address"
              onFocus={() => clearErrors()}
              onChange={onChange}
              value={value}
              onSubmitEditing={() => setFocus('addressLine2')}
              autoCapitalize="words"
              keyboardType="default"
              textContentType="streetAddressLine1"
              returnKeyType="next"
              forwardedRef={ref}
              error={errors.addressLine1}
            />
          )}
        />
        <Controller
          name="addressLine2"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="text"
              name="addressLine2"
              label="Apartment, suite, etc. (optional)"
              placeholder="Enter your apartment, suite, etc."
              onFocus={() => clearErrors()}
              onChange={onChange}
              value={value}
              onSubmitEditing={() => setFocus('city')}
              autoCapitalize="words"
              keyboardType="default"
              textContentType="streetAddressLine2"
              returnKeyType="next"
              forwardedRef={ref}
              error={errors.addressLine2}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          rules={{ required: { value: true, message: 'Required' } }}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="text"
              name="city"
              label="City"
              placeholder="Enter your city"
              onFocus={() => clearErrors()}
              onChange={onChange}
              value={value}
              onSubmitEditing={() => setFocus('stateAbbreviation')}
              autoCapitalize="words"
              keyboardType="default"
              textContentType="addressCity"
              returnKeyType="next"
              forwardedRef={ref}
              error={errors.city}
            />
          )}
        />
        <Controller
          name="stateAbbreviation"
          control={control}
          rules={{ required: { value: true, message: 'Required' } }}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="selector"
              name="state"
              label="State"
              buttonText="Submit"
              placeholder="Select your state"
              options={americanStatesArray}
              onFocus={() => clearErrors()}
              onChange={onChange}
              value={value}
              forwardedRef={ref}
              error={errors.stateAbbreviation}
            />
          )}
        />
        <Controller
          name="postalCode"
          control={control}
          rules={{ required: { value: true, message: 'Required' } }}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type="text"
              name="postalCode"
              label="Zip Code"
              placeholder="Enter your zip code"
              onFocus={() => clearErrors()}
              onChange={onChange}
              value={value}
              onSubmitEditing={() => Keyboard.dismiss()}
              autoCapitalize="none"
              keyboardType="number-pad"
              textContentType="postalCode"
              returnKeyType="done"
              forwardedRef={ref}
              error={errors.postalCode}
            />
          )}
        />
      </View>
      <Button
        onPress={handleSubmit((data: PatientProfileFormData) => {
          actions.updateAction(data);
          onCreatePatient({ ...personalDetails, ...data });
        })}
        label={isPending ? 'Registering...' : 'Register'}
        theme="primary"
      />
    </OnboardingScreen>
  );
}
