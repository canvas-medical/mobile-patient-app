/* eslint-disable max-len */ // Maybe Remove
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  Keyboard,
  Platform,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useForm, Controller } from 'react-hook-form';
import Modal from 'react-native-modal';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Feather, FontAwesome, MaterialIcons, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUpdatePatient, usePatient } from '@services';
import { capitalizeFirstCharacter, clearHistory, formatDate, formatPhoneNumber, timeZoneOffset } from '@utils';
import blurs from '@assets/images/blurs.png';
import { g } from '@styles';
import { Button } from '@components';
import { Picker } from '@react-native-picker/picker';

const s = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: g.size(8),
    padding: g.size(6),
  },
  actionButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonLabel: {
    ...g.labelMedium,
    color: g.white,
  },
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  actionDivider: {
    width: g.size(1),
    height: g.size(52),
    backgroundColor: g.white,
  },
  backButton: {
    position: 'absolute',
    top: g.size(16),
    left: g.size(16),
  },
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  blurCircles: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: g.size(200),
    height: g.size(200),
  },
  container: {
    flex: 1,
    backgroundColor: g.white,
  },
  header: {
    backgroundColor: g.primaryBlue,
    borderBottomLeftRadius: g.size(28),
    borderBottomRightRadius: g.size(28),
    paddingTop: g.size(36),
    paddingHorizontal: g.size(20),
    paddingBottom: g.size(32),
    alignItems: 'center',
    gap: g.size(28), // maybe increase
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(8),
  },
  input: {
    ...g.bodyLarge,
    flex: 1,
    color: g.black,
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    backgroundColor: g.neutral50,
    borderRadius: g.size(50),
  },
  inputError: {
    backgroundColor: g.error,
    color: g.neutral500,
  },
  inputLabel: {
    marginLeft: g.size(2),
    marginBottom: g.size(2),
  },
  inputOptional: {
    fontStyle: 'italic',
  },
  inputRequired: {
    color: g.severityRed,
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
  modal: {
    paddingHorizontal: g.size(8),
    paddingBottom: g.size(12),
    backgroundColor: g.white,
    borderRadius: g.size(16),
    gap: g.size(4),
  },
  name: {
    ...g.labelXLarge,
    color: g.white,
  },
  nameAndPhotoContainer: {
    alignItems: 'center',
    gap: g.size(8),
  },
  patientDataLabel: {
    ...g.labelSmall,
    color: g.neutral500,
  },
  patientDataListItem: {
    justifyContent: 'center',
    gap: g.size(8),
    paddingVertical: g.size(28),
    borderBottomWidth: g.size(1),
    borderBottomColor: g.neutral200
  },
  patientDataValue: {
    ...g.bodyLarge,
    color: g.neutral800,
    marginLeft: g.size(32),
  },
  photo: {
    width: g.size(120),
    height: g.size(120),
    borderRadius: g.size(60),
  },
  scrollContent: {
    paddingHorizontal: g.size(20),
    paddingBottom: g.size(32),
  },
  selectorButtonLabel: {
    ...g.bodyLarge,
    color: g.black,
  },
  selectorButtonLabelError: {
    color: g.neutral500
  }
});

type FormData = {
  preferredName: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  stateAbbreviation: string
  postalCode: string
  gender: string
  birthDate: string
}

export default function PdfModal() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { data: patient } = usePatient();
  const {
    control,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      preferredName: patient?.name[1].given[0] || null,
      firstName: patient?.name[0].given[0] || null,
      middleName: patient?.name[0].given[1] || null,
      lastName: patient?.name[0].family || null,
      email: patient?.telecom?.find((t: { system: string }) => t.system === 'email')?.value || null,
      phone: formatPhoneNumber(patient?.telecom?.find((t: { system: string }) => t.system === 'phone')?.value) || null,
      addressLine1: patient?.address[0]?.line[0] || null,
      addressLine2: patient?.address[0]?.line[1] || null,
      city: patient?.address[0]?.city || null,
      stateAbbreviation: patient?.address[0]?.state || null,
      postalCode: patient?.address[0]?.postalCode || null,
      birthDate: new Date().toISOString().slice(0, 10) || null,
      gender: patient?.gender || null,
    },
    shouldFocusError: false,
  });
  const { mutate: onUpdatePatient, isPending } = useUpdatePatient();
  const [updating, setUpdating] = useState<boolean>(true);
  // const [updating, setUpdating] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showGenderPicker, setShowGenderPicker] = useState<boolean>(false);
  const [provisionalDate, setProvisionalDate] = useState<number>(0);
  const [provisionalGender, setProvisionalGender] = useState<string>('');
  const phoneNumber = formatPhoneNumber(patient?.telecom?.find((t) => t.system === 'phone')?.value);
  const email = patient?.telecom?.find((t) => t.system === 'email')?.value;

  const logout = () => {
    clearHistory(navigation);
    SecureStore.deleteItemAsync('patient_id');
    SecureStore.deleteItemAsync('push_token');
    queryClient.clear();
    router.replace('initial');
  };

  const patientData = [
    {
      label: 'Email',
      dataValue: email,
      icon: <Fontisto name="email" size={g.size(24)} color={g.neutral300} />,
    },
    {
      label: 'Phone',
      dataValue: phoneNumber,
      icon: <Feather name="smartphone" size={g.size(24)} color={g.neutral300} />,
    },
    {
      label: 'Address',
      dataValue: patient?.address ? `${patient?.address[0]?.line[0]}\n${patient?.address[0]?.city}, ${patient?.address[0]?.state} ${patient?.address[0]?.postalCode}` : null,
      icon: <Feather name="home" size={g.size(24)} color={g.neutral300} />,
    },
    {
      label: 'Birthday',
      dataValue: formatDate(patient?.birthDate, 'numeric'),
      icon: <MaterialCommunityIcons name="cake-variant-outline" size={g.size(24)} color={g.neutral300} />,
    },
    {
      label: 'Gender',
      dataValue: capitalizeFirstCharacter(patient?.gender) || null,
      icon: <Feather name="user" size={g.size(24)} color={g.neutral300} />,
    },
  ];

  function logoutSaveButtonLabelSwitch() {
    switch (true) {
      case !updating:
        return 'Logout';
      case isPending:
        return 'Saving...';
      default:
        return 'Save Changes';
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={s.container}>
        <LinearGradient
          style={s.header}
          colors={[g.primaryBlue, g.secondaryBlue]}
          locations={[0.25, 1]}
          end={{ x: 0, y: 1 }}
        >
          <Image
            style={s.blurCircles}
            source={blurs}
          />
          <TouchableOpacity
            style={s.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={g.size(48)} color={g.white} />
          </TouchableOpacity>
          <View style={s.nameAndPhotoContainer}>
            {Array.isArray(patient?.photo) ? (
              <Image source={{ uri: patient?.photo[0].url }} style={s.photo} />
            ) : <FontAwesome name="user-circle-o" size={g.size(48)} color={g.white} />}
            <Text style={s.name}>{`${patient?.name[0]?.given[0] || ''} ${patient?.name[0]?.family || ''}`}</Text>
          </View>
          <View style={s.actionContainer}>
            <View style={s.actionButtonContainer}>
              <TouchableOpacity
                style={s.actionButton}
                onPress={() => setUpdating(!updating)} // Todo: update
              >
                <Text style={s.actionButtonLabel}>
                  {updating ? 'Cancel' : 'Update Profile'}
                </Text>
                {updating
                  ? <MaterialCommunityIcons name="cancel" size={g.size(24)} color={g.white} />
                  : <Feather name="edit-2" size={g.size(22)} color={g.white} />}
              </TouchableOpacity>
            </View>
            <View style={s.actionDivider} />
            <View style={s.actionButtonContainer}>
              <TouchableOpacity
                style={s.actionButton}
                onPress={!updating
                  ? () => logout()
                  : handleSubmit((data: any) => {
                    console.log('data: ', data);
                    onUpdatePatient(data);
                  })}
              >
                <Text style={s.actionButtonLabel}>
                  {logoutSaveButtonLabelSwitch()}
                </Text>
                {
                  updating
                    ? <MaterialIcons name="save-alt" size={g.size(24)} color={g.white} />
                    : <MaterialIcons name="logout" size={g.size(24)} color={g.white} />
                }
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <ScrollView contentContainerStyle={s.scrollContent}>
          {!updating
            ? patientData.map(({ label, dataValue, icon }) => (
              <>
                {(!!dataValue || updating) && (
                  <View key={label} style={s.patientDataListItem}>
                    <View style={s.iconLabelContainer}>
                      {icon}
                      <Text style={s.patientDataLabel}>{label}</Text>
                    </View>
                    <Text style={s.patientDataValue}>{dataValue}</Text>
                  </View>
                )}
              </>
            )) : (
              <>
                <View style={s.patientDataListItem}>
                  <View style={s.iconLabelContainer}>
                    <Feather name="user" size={g.size(24)} color={g.neutral300} />
                    <Text style={s.patientDataLabel}>Name</Text>
                  </View>
                  <Controller
                    name="preferredName"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          Preferred
                          <Text style={s.inputOptional}> - Optional</Text>
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.preferredName && s.inputError]}
                          placeholder="Preferred name"
                          placeholderTextColor={errors.preferredName ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('firstName')}
                          autoCapitalize="words"
                          keyboardType="default"
                          textContentType="givenName"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          First
                          {errors.firstName && <Text style={s.inputRequired}> - Required</Text>}
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.firstName && s.inputError]}
                          placeholder="First name"
                          placeholderTextColor={errors.firstName ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('middleName')}
                          autoCapitalize="words"
                          keyboardType="default"
                          textContentType="givenName"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="middleName"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          Middle
                          <Text style={s.inputOptional}> - Optional</Text>
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.middleName && s.inputError]}
                          placeholder="Middle name"
                          placeholderTextColor={errors.middleName ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('lastName')}
                          autoCapitalize="words"
                          keyboardType="default"
                          textContentType="middleName"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          Last
                          {errors.lastName && <Text style={s.inputRequired}> - Required</Text>}
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.lastName && s.inputError]}
                          placeholder="Last name"
                          placeholderTextColor={errors.lastName ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('email')}
                          autoCapitalize="words"
                          keyboardType="default"
                          textContentType="familyName"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                </View>
                <View style={s.patientDataListItem}>
                  <View style={s.iconLabelContainer}>
                    <Fontisto name="email" size={g.size(24)} color={g.neutral300} />
                    <Text style={s.patientDataLabel}>Email</Text>
                  </View>
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
                      <TextInput
                        style={[s.input, !!errors.email && s.inputError]}
                        placeholder="Email"
                        placeholderTextColor={errors.email ? g.neutral500 : g.neutral200}
                        onFocus={() => clearErrors}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                          onChange(e.nativeEvent.text);
                        }}
                        value={value}
                        onSubmitEditing={() => setFocus('phone')}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        returnKeyType="next"
                        ref={ref}
                      />
                    )}
                  />
                </View>
                <View style={s.patientDataListItem}>
                  <View style={s.iconLabelContainer}>
                    <Feather name="smartphone" size={g.size(24)} color={g.neutral300} />
                    <Text style={s.patientDataLabel}>Phone</Text>
                  </View>
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
                      <TextInput
                        style={[s.input, !!errors.phone && s.inputError]}
                        placeholder="Phone"
                        placeholderTextColor={errors.phone ? g.neutral500 : g.neutral200}
                        onFocus={() => clearErrors}
                        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                          onChange(formatPhoneNumber(e.nativeEvent.text));
                        }}
                        value={value}
                        onSubmitEditing={() => setFocus('addressLine1')}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        returnKeyType="next"
                        ref={ref}
                      />
                    )}
                  />
                </View>
                <View style={s.patientDataListItem}>
                  <View style={s.iconLabelContainer}>
                    <Feather name="home" size={g.size(24)} color={g.neutral300} />
                    <Text style={s.patientDataLabel}>Address</Text>
                  </View>
                  <Controller
                    name="addressLine1"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          Street Address
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.addressLine1 && s.inputError]}
                          placeholder="Address line 1"
                          placeholderTextColor={errors.addressLine1 ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('addressLine2')}
                          autoCapitalize="words"
                          keyboardType="default"
                          textContentType="fullStreetAddress"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="addressLine2"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          Address Line 2
                          <Text style={s.inputOptional}> - Optional</Text>
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.addressLine2 && s.inputError]}
                          placeholder="Address line 2"
                          placeholderTextColor={errors.addressLine2 ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('city')}
                          autoCapitalize="words"
                          keyboardType="default"
                          textContentType="fullStreetAddress"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          City
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.city && s.inputError]}
                          placeholder="City"
                          placeholderTextColor={errors.city ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('stateAbbreviation')}
                          autoCapitalize="words"
                          keyboardType="default"
                          textContentType="addressCity"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="stateAbbreviation"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          State
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.stateAbbreviation && s.inputError]}
                          placeholder="State"
                          placeholderTextColor={errors.stateAbbreviation ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          onSubmitEditing={() => setFocus('postalCode')}
                          autoCapitalize="characters"
                          keyboardType="default"
                          textContentType="addressState"
                          returnKeyType="next"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="postalCode"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <View>
                        <Text style={[s.patientDataLabel, s.inputLabel]}>
                          Zip Code
                        </Text>
                        <TextInput
                          style={[s.input, !!errors.postalCode && s.inputError]}
                          placeholder="Postal code"
                          placeholderTextColor={errors.postalCode ? g.neutral500 : g.neutral200}
                          onFocus={() => clearErrors}
                          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                            onChange(e.nativeEvent.text);
                          }}
                          value={value}
                          autoCapitalize="characters"
                          keyboardType="default"
                          textContentType="postalCode"
                          returnKeyType="done"
                          ref={ref}
                        />
                      </View>
                    )}
                  />
                </View>
                <View style={s.patientDataListItem}>
                  <View style={s.iconLabelContainer}>
                    <MaterialCommunityIcons name="cake-variant-outline" size={g.size(24)} color={g.neutral300} />
                    <Text style={s.patientDataLabel}>Birthday</Text>
                  </View>
                  <Controller
                    name="birthDate"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      <>
                        {Platform.OS === 'android' && showDatePicker && (
                          <DateTimePicker
                            mode="date"
                            value={timeZoneOffset(value)}
                            themeVariant="dark"
                            maximumDate={new Date()}
                            onChange={(e: DateTimePickerEvent) => {
                              if (e.type === 'set') {
                                onChange(new Date(e.nativeEvent.timestamp).toISOString().slice(0, 10));
                                setShowDatePicker(false);
                              }
                            }}
                          />
                        )}
                        {Platform.OS === 'ios' && (
                          <Modal
                            animationIn="fadeIn"
                            animationOut="fadeOut"
                            isVisible={showDatePicker}
                            swipeDirection="right"
                            onSwipeComplete={() => setShowDatePicker(false)}
                            customBackdrop={(
                              <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
                                <View style={s.backdrop} />
                              </TouchableWithoutFeedback>
                            )}
                          >
                            <View style={s.modal}>
                              <DateTimePicker
                                mode="date"
                                display="inline"
                                value={timeZoneOffset(value)}
                                themeVariant="light"
                                maximumDate={new Date()}
                                onChange={(e: DateTimePickerEvent) => setProvisionalDate(e.nativeEvent.timestamp)}
                              />
                              <Button
                                label="Select Date"
                                theme="primary"
                                onPress={() => {
                                  onChange(new Date(provisionalDate).toISOString().slice(0, 10));
                                  setShowDatePicker(false);
                                }}
                              />
                            </View>
                          </Modal>
                        )}
                        <TouchableOpacity
                          style={[s.input, !!errors.birthDate && s.inputError]}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <Text
                            style={[
                              s.selectorButtonLabel,
                              !!errors.birthDate && s.selectorButtonLabelError,
                            ]}
                          >
                            {formatDate(value, 'numeric')}
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  />
                </View>
                <View style={[s.patientDataListItem, s.lastListItem]}>
                  <View style={s.iconLabelContainer}>
                    <Feather name="user" size={g.size(24)} color={g.neutral300} />
                    <Text style={s.patientDataLabel}>Gender</Text>
                  </View>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: { value: true, message: 'Required' } }}
                    render={({ field: { onChange, value, ref } }) => (
                      // onFocus={() => clearErrors()}
                      //   onChange={onChange}
                      //   value={value}
                      //   forwardedRef={ref}
                      //   error={errors.gender}
                      // />
                      <>
                        <Modal
                          animationIn="fadeIn"
                          animationOut="fadeOut"
                          isVisible={showGenderPicker}
                          swipeDirection="right"
                          onSwipeComplete={() => setShowGenderPicker(false)}
                          customBackdrop={(
                            <TouchableWithoutFeedback onPress={() => setShowGenderPicker(false)}>
                              <View style={s.backdrop} />
                            </TouchableWithoutFeedback>
                          )}
                        >
                          <View style={s.modal}>
                            <Picker
                              selectedValue={value}
                              onValueChange={(itemValue) => setProvisionalGender(itemValue)}
                            >
                              {['Male', 'Female', 'Other', 'Unknown'].map((option) => (
                                <Picker.Item
                                  key={option}
                                  label={option}
                                  value={option}
                                />
                              ))}
                            </Picker>
                            <Button
                              label="Select"
                              theme="primary"
                              onPress={() => {
                                onChange(provisionalGender);
                                setShowGenderPicker(false);
                              }}
                            />
                          </View>
                        </Modal>
                        <TouchableOpacity
                          style={[s.input, !!errors.birthDate && s.inputError]}
                          onPress={() => setShowGenderPicker(true)}
                        >
                          <Text
                            style={[
                              s.selectorButtonLabel,
                              !!errors.birthDate && s.selectorButtonLabelError,
                            ]}
                          >
                            {capitalizeFirstCharacter(value)}
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  />
                </View>
              </>
            )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
