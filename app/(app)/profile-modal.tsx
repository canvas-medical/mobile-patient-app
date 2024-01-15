import { useEffect, useState } from 'react';
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
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { router, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { Image } from 'expo-image';
import { Feather, MaterialIcons, Fontisto, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useUpdatePatient, usePatient, useCoverage, Insurers } from '@services';
import { capitalizeFirstCharacter, clearHistory, formatDate, formatPhoneNumber } from '@utils';
import { Button } from '@components';
import { americanStatesArray } from '@constants';
import blurs from '@assets/images/blurs.png';
import { g } from '@styles';

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
  actionButtonLabelDisabled: {
    opacity: 0.6,
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
    top: Platform.OS === 'ios' ? g.size(16) : g.size(40),
    left: g.size(16),
  },
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  birthDate: {
    ...g.labelSmall,
    color: g.white,
  },
  birthDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(8),
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
    paddingTop: Platform.OS === 'ios' ? g.size(48) : g.size(80),
    paddingHorizontal: g.size(20),
    paddingBottom: g.size(24),
    alignItems: 'center',
    gap: g.size(28),
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
    textAlign: 'center',
    paddingHorizontal: g.size(60),
  },
  nameAndBirthDateContainer: {
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: g.size(20),
    paddingBottom: g.size(32),
  },
  selectorButtonLabel: {
    ...g.bodyLarge,
    color: g.black,
  },
  selectorButtonLabelError: {
    color: g.neutral500
  },
  selectorButtonLabelPlaceholder: {
    color: g.neutral200
  },
});

type FormData = {
  insurer: string
  memberID: string
  groupNumber: string
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
  birthDate: string
  gender: string
}

export default function ProfileModal() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { data: patient } = usePatient();
  const { data: coverage } = useCoverage();
  const defaultValues = {
    coverageID: coverage?.id || '',
    insurer: coverage?.payor ? coverage?.payor[0]?.display : '',
    memberID: coverage?.subscriberId || '',
    groupNumber: coverage?.class ? coverage?.class[0]?.value : null,
    preferredName: patient?.name[1] ? patient?.name[1]?.given[0] : null,
    firstName: patient?.name[0]?.given[0] ? patient?.name[0]?.given[0] : null,
    middleName: patient?.name[0]?.given[1] ? patient?.name[0]?.given[1] : null,
    lastName: patient?.name[0]?.family ? patient?.name[0]?.family : null,
    email: patient?.telecom && patient?.telecom?.find((t: { system: string }) => t.system === 'email')?.value
      ? patient?.telecom?.find((t: { system: string }) => t.system === 'email')?.value
      : null,
    phone: patient?.telecom && patient?.telecom?.find((t: { system: string }) => t.system === 'phone')?.value
      ? formatPhoneNumber(patient?.telecom?.find((t: { system: string }) => t.system === 'phone')?.value)
      : null,
    addressLine1: patient?.address && patient?.address[0]?.line[0] ? patient?.address[0]?.line[0] : null,
    addressLine2: patient?.address && patient?.address[0]?.line[1] ? patient?.address[0]?.line[1] : null,
    city: patient?.address && patient?.address[0]?.city ? patient?.address[0]?.city : null,
    stateAbbreviation: patient?.address && patient?.address[0]?.state ? patient?.address[0]?.state : null,
    postalCode: patient?.address && patient?.address[0]?.postalCode ? patient?.address[0]?.postalCode : null,
    birthDate: patient?.birthDate || '',
    gender: capitalizeFirstCharacter(patient?.gender) || '',
  };
  const {
    control,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues,
    // defaultValues: useMemo(() => defaultValues, [coverage, patient]),
    shouldFocusError: false,
  });

  const { mutateAsync: onUpdatePatient, isPending } = useUpdatePatient();
  const [showProviderPicker, setShowProviderPicker] = useState<boolean>(false);
  const [showStatePicker, setShowStatePicker] = useState<boolean>(false);
  const [showGenderPicker, setShowGenderPicker] = useState<boolean>(false);

  useEffect(() => {
    reset(defaultValues);
  }, [coverage, patient]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (isDirty) {
        e.preventDefault();
        Alert.alert(
          'Are you sure?',
          'Any unsaved changes will be discarded',
          [
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => {
                unsubscribe();
                navigation.dispatch(e.data.action);
              }
            },
            { text: 'Keep Editing', onPress: () => { } },
          ]
        );
      }
    });

    return unsubscribe;
  }, [navigation, isDirty]);

  const logout = () => {
    Alert.alert(
      'Are you sure?',
      'You will be logged out of your account',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            clearHistory(navigation);
            SecureStore.deleteItemAsync('patient_id');
            SecureStore.deleteItemAsync('push_token');
            queryClient.clear();
            router.replace('initial');
          }
        },
      ]
    );
  };

  // How to display self-pay patients?

  return (
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
        <View style={s.nameAndBirthDateContainer}>
          <Text style={s.name}>
            {`${patient?.name[0]?.given[0] || ''} ${patient?.name[0]?.family || ''}`}
          </Text>
          <View style={s.birthDateContainer}>
            <MaterialCommunityIcons name="cake-variant-outline" size={g.size(16)} color={g.white} />
            <Text style={s.birthDate}>
              {formatDate(patient?.birthDate, 'numeric')}
            </Text>
          </View>
        </View>
        <View style={s.actionContainer}>
          <View style={s.actionButtonContainer}>
            <TouchableOpacity
              style={s.actionButton}
              onPress={() => logout()}
            >
              <Text style={s.actionButtonLabel}>
                Logout
              </Text>
              <MaterialIcons name="logout" size={g.size(24)} color={g.white} />
            </TouchableOpacity>
          </View>
          <View style={s.actionDivider} />
          <View style={s.actionButtonContainer}>
            <TouchableOpacity
              style={s.actionButton}
              onPress={handleSubmit((data: any) => { // TODO: type
                Keyboard.dismiss();
                onUpdatePatient(data);
                reset(data);
              })}
              disabled={!isDirty || isPending}
            >
              <Text style={[s.actionButtonLabel, !isDirty && s.actionButtonLabelDisabled]}>
                {isPending ? 'Saving...' : 'Save Changes'}
              </Text>
              <Feather name="edit-2" size={g.size(22)} color={g.white} style={!isDirty && s.actionButtonLabelDisabled} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        keyboardVerticalOffset={g.size(55)}
        style={s.scroll}
      >
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
        >
          <View style={s.patientDataListItem}>
            <View style={s.iconLabelContainer}>
              <FontAwesome5 name="address-card" size={g.size(22)} color={g.neutral300} />
              <Text style={s.patientDataLabel}>
                Insurance
              </Text>
            </View>
            <Controller
              name="insurer"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={[s.patientDataLabel, s.inputLabel]}>
                    Provider
                    {errors.insurer && <Text style={s.inputRequired}>{` - ${errors.insurer.message}`}</Text>}
                  </Text>
                  <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    isVisible={showProviderPicker}
                    swipeDirection="right"
                    onSwipeComplete={() => {
                      onChange(defaultValues.insurer);
                      setShowProviderPicker(false);
                    }}
                    customBackdrop={(
                      <TouchableWithoutFeedback
                        onPress={() => {
                          onChange(defaultValues.insurer);
                          setShowProviderPicker(false);
                        }}
                      >
                        <View style={s.backdrop} />
                      </TouchableWithoutFeedback>
                    )}
                  >
                    <View style={s.modal}>
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => onChange(itemValue)}
                      >
                        {Object.keys(Insurers).map((option) => (
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
                        onPress={() => setShowProviderPicker(false)}
                      />
                    </View>
                  </Modal>
                  <TouchableOpacity
                    style={[s.input, !!errors.insurer && s.inputError]}
                    onPress={() => setShowProviderPicker(true)}
                  >
                    <Text
                      style={[
                        s.selectorButtonLabel,
                        !value && s.selectorButtonLabelPlaceholder,
                        !!errors.insurer && s.selectorButtonLabelError,
                      ]}
                    >
                      {value || 'Select a provider'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Controller
              name="memberID"
              control={control}
              rules={{ required: { value: true, message: 'Required' } }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={[s.patientDataLabel, s.inputLabel]}>
                    Member ID
                    {errors.memberID && <Text style={s.inputRequired}>{` - ${errors.memberID.message}`}</Text>}
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.memberID && s.inputError]}
                    placeholder="Member ID"
                    placeholderTextColor={errors.memberID ? g.neutral500 : g.neutral200}
                    onFocus={() => clearErrors()}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      onChange(e.nativeEvent.text);
                    }}
                    value={value}
                    onSubmitEditing={() => setFocus('groupNumber')}
                    keyboardType="default"
                    returnKeyType="next"
                  />
                </View>
              )}
            />
            <Controller
              name="groupNumber"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <View>
                  <Text style={[s.patientDataLabel, s.inputLabel]}>
                    Group Number
                    <Text style={s.inputOptional}> - Optional</Text>
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.groupNumber && s.inputError]}
                    placeholder="Group Number"
                    placeholderTextColor={errors.groupNumber ? g.neutral500 : g.neutral200}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      onChange(e.nativeEvent.text);
                    }}
                    value={value}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    keyboardType="default"
                    returnKeyType="done"
                    ref={ref}
                  />
                </View>
              )}
            />
          </View>
          <View style={s.patientDataListItem}>
            <View style={s.iconLabelContainer}>
              <Feather name="user" size={g.size(24)} color={g.neutral300} />
              <Text style={s.patientDataLabel}>
                Preferred Name
                <Text style={s.inputOptional}> - Optional</Text>
              </Text>
            </View>
            <Controller
              name="preferredName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[s.input, !!errors.preferredName && s.inputError]}
                  placeholder="Preferred Name"
                  placeholderTextColor={errors.preferredName ? g.neutral500 : g.neutral200}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    onChange(e.nativeEvent.text);
                  }}
                  value={value}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  autoCapitalize="words"
                  keyboardType="default"
                  textContentType="nickname"
                  returnKeyType="done"
                />
              )}
            />
          </View>
          <View style={s.patientDataListItem}>
            <View style={s.iconLabelContainer}>
              <Fontisto name="email" size={g.size(24)} color={g.neutral300} />
              <Text style={s.patientDataLabel}>
                Email
                {errors.email && <Text style={s.inputRequired}>{` - ${errors.email.message}`}</Text>}
              </Text>
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[s.input, !!errors.email && s.inputError]}
                  placeholder="Email"
                  placeholderTextColor={errors.email ? g.neutral500 : g.neutral200}
                  onFocus={() => clearErrors()}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    onChange(e.nativeEvent.text);
                  }}
                  value={value}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  returnKeyType="done"
                />
              )}
            />
          </View>
          <View style={s.patientDataListItem}>
            <View style={s.iconLabelContainer}>
              <Feather name="smartphone" size={g.size(24)} color={g.neutral300} />
              <Text style={s.patientDataLabel}>
                Phone
                {errors.phone && <Text style={s.inputRequired}>{` - ${errors.phone.message}`}</Text>}
              </Text>
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
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[s.input, !!errors.phone && s.inputError]}
                  placeholder="Phone Number"
                  placeholderTextColor={errors.phone ? g.neutral500 : g.neutral200}
                  onFocus={() => clearErrors()}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    onChange(formatPhoneNumber(e.nativeEvent.text));
                  }}
                  value={value}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  autoCapitalize="none"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  returnKeyType="done"
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
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={[s.patientDataLabel, s.inputLabel]}>
                    Street Address
                    {errors.addressLine1 && <Text style={s.inputRequired}>{` - ${errors.addressLine1.message}`}</Text>}
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.addressLine1 && s.inputError]}
                    placeholder="Address line 1"
                    placeholderTextColor={errors.addressLine1 ? g.neutral500 : g.neutral200}
                    onFocus={() => clearErrors()}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      onChange(e.nativeEvent.text);
                    }}
                    value={value}
                    onSubmitEditing={() => setFocus('addressLine2')}
                    autoCapitalize="words"
                    keyboardType="default"
                    textContentType="streetAddressLine1"
                    returnKeyType="next"
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
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      onChange(e.nativeEvent.text);
                    }}
                    value={value}
                    onSubmitEditing={() => setFocus('city')}
                    autoCapitalize="words"
                    keyboardType="default"
                    textContentType="streetAddressLine2"
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
                    {errors.city && <Text style={s.inputRequired}>{` - ${errors.city.message}`}</Text>}
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.city && s.inputError]}
                    placeholder="City"
                    placeholderTextColor={errors.city ? g.neutral500 : g.neutral200}
                    onFocus={() => clearErrors()}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      onChange(e.nativeEvent.text);
                    }}
                    value={value}
                    onSubmitEditing={() => setFocus('postalCode')}
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
              name="postalCode"
              control={control}
              rules={{ required: { value: true, message: 'Required' } }}
              render={({ field: { onChange, value, ref } }) => (
                <View>
                  <Text style={[s.patientDataLabel, s.inputLabel]}>
                    Zip Code
                    {errors.postalCode && <Text style={s.inputRequired}>{` - ${errors.postalCode.message}`}</Text>}
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.postalCode && s.inputError]}
                    placeholder="Postal code"
                    placeholderTextColor={errors.postalCode ? g.neutral500 : g.neutral200}
                    onFocus={() => clearErrors()}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                      onChange(e.nativeEvent.text);
                    }}
                    value={value}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    autoCapitalize="characters"
                    keyboardType="number-pad"
                    textContentType="postalCode"
                    returnKeyType="done"
                    ref={ref}
                  />
                </View>
              )}
            />
            <Controller
              name="stateAbbreviation"
              control={control}
              rules={{ required: { value: true, message: 'Required' } }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={[s.patientDataLabel, s.inputLabel]}>
                    State
                    {errors.stateAbbreviation && <Text style={s.inputRequired}>{` - ${errors.stateAbbreviation.message}`}</Text>}
                  </Text>
                  <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    isVisible={showStatePicker}
                    swipeDirection="right"
                    onSwipeComplete={() => {
                      onChange(defaultValues.stateAbbreviation);
                      setShowStatePicker(false);
                    }}
                    customBackdrop={(
                      <TouchableWithoutFeedback
                        onPress={() => {
                          onChange(defaultValues.stateAbbreviation);
                          setShowStatePicker(false);
                        }}
                      >
                        <View style={s.backdrop} />
                      </TouchableWithoutFeedback>
                    )}
                  >
                    <View style={s.modal}>
                      <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => onChange(itemValue)}
                      >
                        {americanStatesArray.map((option) => (
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
                        onPress={() => onChange(value)}
                      />
                    </View>
                  </Modal>
                  <TouchableOpacity
                    style={[s.input, !!errors.stateAbbreviation && s.inputError]}
                    onPress={() => setShowStatePicker(true)}
                  >
                    <Text
                      style={[
                        s.selectorButtonLabel,
                        !value && s.selectorButtonLabelPlaceholder,
                        !!errors.stateAbbreviation && s.selectorButtonLabelError,
                      ]}
                    >
                      {value || 'Select a state'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={[s.patientDataListItem, s.lastListItem]}>
            <View style={s.iconLabelContainer}>
              <Feather name="user" size={g.size(24)} color={g.neutral300} />
              <Text style={s.patientDataLabel}>
                Gender
                {errors.gender && <Text style={s.inputRequired}>{` - ${errors.gender.message}`}</Text>}
              </Text>
            </View>
            <Controller
              name="gender"
              control={control}
              rules={{ required: { value: true, message: 'Required' } }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Modal
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    isVisible={showGenderPicker}
                    swipeDirection="right"
                    onSwipeComplete={() => {
                      onChange(defaultValues.gender);
                      setShowGenderPicker(false);
                    }}
                    customBackdrop={(
                      <TouchableWithoutFeedback
                        onPress={() => {
                          onChange(defaultValues.gender);
                          setShowGenderPicker(false);
                        }}
                      >
                        <View style={s.backdrop} />
                      </TouchableWithoutFeedback>
                    )}
                  >
                    <View style={s.modal}>
                      <Picker
                        selectedValue={capitalizeFirstCharacter(value || '')}
                        onValueChange={(itemValue) => onChange(itemValue)}
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
                        onPress={() => setShowGenderPicker(false)}
                      />
                    </View>
                  </Modal>
                  <TouchableOpacity
                    style={[s.input, !!errors.gender && s.inputError]}
                    onPress={() => setShowGenderPicker(true)}
                  >
                    <Text
                      style={[
                        s.selectorButtonLabel,
                        !value && s.selectorButtonLabelPlaceholder,
                        !!errors.gender && s.selectorButtonLabelError,
                      ]}
                    >
                      {capitalizeFirstCharacter(value || '')}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
