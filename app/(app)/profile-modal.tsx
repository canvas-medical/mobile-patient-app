import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { router, useNavigation } from 'expo-router';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import {
  Feather,
  FontAwesome5,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import { PatientProfileFormData } from '@interfaces';
import { useUpdatePatient, usePatient, useCoverage, Insurers, useCancelCoverage } from '@services';
import { capitalizeFirstCharacter, clearHistory, formatDate, formatPhoneNumber } from '@utils';
import { Button } from '@components';
import { americanStatesArray } from '@constants';
import graphic from '@assets/images/graphic.png';
import { g } from '@styles';

const s = StyleSheet.create({
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? g.ms(20) : g.ms(44),
    left: g.ms(16),
    right: g.ms(16),
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
    gap: g.ms(8),
  },
  cancelInsuranceButton: {
    width: g.ms(24),
    height: g.ms(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: g.white,
  },
  editImageIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: g.editGreen,
    overflow: 'hidden',
    borderColor: g.white,
    borderStyle: 'solid',
    borderWidth: g.ms(1),
    borderRadius: g.ms(20),
    padding: g.ms(2),
  },
  graphic: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '82%',
    aspectRatio: 1.2,
  },
  header: {
    backgroundColor: g.tertiaryBlue,
    overflow: 'hidden',
    borderBottomLeftRadius: g.ws(28),
    borderBottomRightRadius: g.ws(28),
    paddingTop: Platform.OS === 'ios' ? g.hs(48) : g.hs(80),
    paddingHorizontal: g.ws(20),
    paddingBottom: g.hs(24),
    alignItems: 'center',
    gap: g.hs(8),
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.ms(8),
  },
  input: {
    ...g.bodyLarge,
    flex: 1,
    color: g.neutral900,
    paddingVertical: g.hs(8),
    paddingHorizontal: g.ms(16),
    backgroundColor: g.neutral150,
    borderRadius: g.ms(50),
  },
  inputError: {
    backgroundColor: g.error,
  },
  inputLabel: {
    marginLeft: g.ms(2),
    marginBottom: g.hs(4),
  },
  inputRequired: {
    color: g.severityRed,
  },
  insuranceContainer: {
    gap: g.hs(8),
    marginTop: g.hs(24),
    padding: g.ms(16),
    borderWidth: g.ms(1),
    borderColor: g.neutral200,
    borderRadius: g.ms(8),
  },
  insuranceHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: g.ms(8),
    padding: g.ms(6),
  },
  logoutButtonLabel: {
    ...g.labelMedium,
    color: g.white,
  },
  modal: {
    paddingHorizontal: g.ws(8),
    paddingBottom: g.hs(12),
    backgroundColor: g.white,
    width: '85%',
    maxWidth: 375,
    borderRadius: g.ms(16),
    gap: g.hs(4),
    alignSelf: 'center',
  },
  name: {
    ...g.labelXLarge,
    color: g.white,
    textAlign: 'center',
    paddingHorizontal: g.ws(60),
  },
  nameAndBirthDateContainer: {
    alignItems: 'center',
    gap: g.hs(4),
  },
  patientDataLabel: {
    ...g.labelSmall,
    color: g.neutral500,
  },
  patientDataListItem: {
    justifyContent: 'center',
    gap: g.hs(8),
    paddingVertical: g.hs(28),
    borderBottomWidth: g.ms(1),
    borderBottomColor: g.neutral300
  },
  pickerItem: {
    ...g.bodyLarge,
    color: g.neutral900,
  },
  saveButton: {
    ...g.buttonShadow,
    width: g.ms(72),
    height: g.ms(72),
    borderRadius: g.ms(36),
    backgroundColor: g.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: g.ms(12),
    bottom: g.ms(20),
  },
  saveButtonDisabled: {
    opacity: 0.2
  },
  saveButtonLabel: {
    ...g.labelMedium,
    color: g.white,
  },
  saveButtonLoading: {
    opacity: 0.8
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: g.ms(20),
    paddingBottom: g.hs(96),
  },
  selectorButtonLabel: {
    ...g.bodyLarge,
    color: g.neutral900,
  },
  selectorButtonLabelError: {
    color: g.neutral500,
  },
  selectorButtonLabelPlaceholder: {
    color: g.neutral400
  },
  userImage: {
    height: g.ms(72),
    width: g.ms(72),
    borderRadius: g.ms(36),
  },
  version: {
    ...g.bodySmall,
    color: g.neutral500,
    opacity: 0.6,
    position: 'absolute',
    left: g.ws(16),
    bottom: g.ws(16)
  }
});

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ProfileModal() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { data: patient } = usePatient();
  const { data: coverage, refetch: refetchCoverage } = useCoverage();
  const patientData = {
    coverageID: coverage?.id || '',
    insurer: coverage?.payor ? coverage?.payor[0]?.display : '',
    memberID: coverage?.subscriberId || '',
    groupNumber: coverage?.class ? coverage?.class[0]?.value : null,
    preferredName: patient?.name && patient?.name[1] ? patient?.name[1]?.given[0] : null,
    firstName: patient?.name && patient?.name[0]?.given[0] ? patient?.name[0]?.given[0] : null,
    middleName: patient?.name && patient?.name[0]?.given[1] ? patient?.name[0]?.given[1] : null,
    lastName: patient?.name && patient?.name[0]?.family ? patient?.name[0]?.family : null,
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
    birthDate: patient?.birthDate ?? '',
    gender: capitalizeFirstCharacter(patient?.gender ?? ''),
  };
  const {
    control,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty, defaultValues },
    reset,
  } = useForm<PatientProfileFormData>({
    defaultValues: patientData,
    shouldFocusError: false,
  });

  const { mutateAsync: onUpdatePatient, isPending } = useUpdatePatient();
  const { mutateAsync: cancelCoverage, isPending: cancelPending } = useCancelCoverage();
  const [showProviderPicker, setShowProviderPicker] = useState<boolean>(false);
  const [showStatePicker, setShowStatePicker] = useState<boolean>(false);
  const [showGenderPicker, setShowGenderPicker] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const prevIsDirtyRef = useRef<boolean>(false);
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  useEffect(() => {
    const buttonAnimation = () => {
      // This is to draw the users attention to the save button when it is made clickable
      if (!prevIsDirtyRef.current && isDirty) {
        offset.value = withRepeat(
          withTiming(-10, { duration: 300 }),
          2,
          true
        );
        prevIsDirtyRef.current = isDirty;
      }
    };
    return buttonAnimation();
  }, [isDirty]);

  useEffect(() => {
    reset(patientData);
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
                navigation.dispatch(e.data?.action);
              }
            },
            { text: 'Keep Editing', onPress: () => { } },
          ]
        );
      }
    });

    return unsubscribe;
  }, [navigation, isDirty]);

  const pickImage = async (onChange: (string) => void) => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0]?.uri, { encoding: 'base64' });
      onChange(base64);
      setImage(result.assets[0].uri);
    }
  };

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

  const cancelInsuranceConfirmation = () => {
    Alert.alert(
      'Are you sure?',
      'This will remove your coverage',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove Coverage',
          style: 'destructive',
          onPress: async () => {
            const insurer = coverage?.payor?.[0]?.display ?? null;
            const memberID = coverage?.subscriberId ?? null;
            const groupNumber = coverage?.class?.[0]?.value ?? null;
            await cancelCoverage({ coverageID: coverage?.id, insurer, memberID, groupNumber });
            await refetchCoverage();
            reset();
          }
        },
      ]
    );
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Image
          style={s.graphic}
          source={graphic}
        />
        <View style={s.actionButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={g.ms(40)} color={g.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.logoutButton}
            onPress={() => logout()}
          >
            <Text style={s.logoutButtonLabel}>
              Logout
            </Text>
            <MaterialIcons name="logout" size={g.ms(24)} color={g.white} />
          </TouchableOpacity>
        </View>
        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange } }) => (
            <TouchableOpacity onPress={() => pickImage(onChange)}>
              {patient?.photo
                ? <Image source={{ uri: image ?? patient.photo[0].url }} style={s.userImage} />
                : <FontAwesome name="user-circle-o" size={g.ms(72)} color={g.white} />}
              <View style={s.editImageIconContainer}>
                <MaterialIcons name="mode-edit" size={g.ms(14)} color={g.white} />
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={s.nameAndBirthDateContainer}>
          <Text style={s.name}>
            {`${defaultValues.firstName ?? ''} ${defaultValues.lastName ?? ''}`}
          </Text>
          <View style={s.birthDateContainer}>
            <MaterialCommunityIcons name="cake-variant-outline" size={g.ms(16)} color={g.white} />
            <Text style={s.birthDate}>
              {formatDate(patient?.birthDate)}
            </Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        keyboardVerticalOffset={g.ms(55)}
        style={s.scroll}
      >
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
        >
          <View style={s.insuranceContainer}>
            <View style={s.insuranceHeader}>
              <View style={s.iconLabelContainer}>
                <FontAwesome5 name="address-card" size={g.ms(22)} color={g.neutral400} />
                <Text style={s.patientDataLabel}>
                  Insurance
                </Text>
              </View>
              {coverage?.id
                && (
                  <TouchableOpacity
                    style={s.cancelInsuranceButton}
                    disabled={!coverage?.id || isPending}
                    onPress={cancelInsuranceConfirmation}
                  >
                    {cancelPending
                      ? <ActivityIndicator size="small" color={g.primaryBlue} />
                      : <MaterialIcons name="delete-forever" size={g.ms(24)} color={g.neutral400} />}
                  </TouchableOpacity>
                )}
            </View>
            <Controller
              name="insurer"
              control={control}
              rules={{ required: { value: !!coverage?.id, message: 'Required' } }}
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
                      onChange(patientData.insurer);
                      setShowProviderPicker(false);
                    }}
                    customBackdrop={(
                      <TouchableWithoutFeedback
                        onPress={() => {
                          onChange(patientData.insurer);
                          setShowProviderPicker(false);
                        }}
                      >
                        <View style={s.backdrop} />
                      </TouchableWithoutFeedback>
                    )}
                  >
                    <View style={s.modal}>
                      <Picker
                        itemStyle={s.pickerItem}
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                          if (itemValue !== 'Select One') onChange(itemValue);
                        }}
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
              rules={{ required: { value: !!coverage?.id, message: 'Required' } }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={[s.patientDataLabel, s.inputLabel]}>
                    Member ID
                    {errors.memberID && <Text style={s.inputRequired}>{` - ${errors.memberID.message}`}</Text>}
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.memberID && s.inputError]}
                    placeholder="Member ID"
                    placeholderTextColor={errors.memberID ? g.neutral500 : g.neutral400}
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
                    Group Number - Optional
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.groupNumber && s.inputError]}
                    placeholder="Group Number"
                    placeholderTextColor={errors.groupNumber ? g.neutral500 : g.neutral400}
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
              <Feather name="user" size={g.ms(24)} color={g.neutral400} />
              <Text style={s.patientDataLabel}>
                Preferred Name - Optional
              </Text>
            </View>
            <Controller
              name="preferredName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[s.input, !!errors.preferredName && s.inputError]}
                  placeholder="Preferred Name"
                  placeholderTextColor={errors.preferredName ? g.neutral500 : g.neutral400}
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
              <Fontisto name="email" size={g.ms(24)} color={g.neutral400} />
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
                  placeholderTextColor={errors.email ? g.neutral500 : g.neutral400}
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
              <Feather name="smartphone" size={g.ms(24)} color={g.neutral400} />
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
                  placeholderTextColor={errors.phone ? g.neutral500 : g.neutral400}
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
              <Feather name="home" size={g.ms(24)} color={g.neutral400} />
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
                    placeholderTextColor={errors.addressLine1 ? g.neutral500 : g.neutral400}
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
                    Address Line 2 - Optional
                  </Text>
                  <TextInput
                    style={[s.input, !!errors.addressLine2 && s.inputError]}
                    placeholder="Address line 2"
                    placeholderTextColor={errors.addressLine2 ? g.neutral500 : g.neutral400}
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
                    placeholderTextColor={errors.city ? g.neutral500 : g.neutral400}
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
                    placeholderTextColor={errors.postalCode ? g.neutral500 : g.neutral400}
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
                      onChange(patientData.stateAbbreviation);
                      setShowStatePicker(false);
                    }}
                    customBackdrop={(
                      <TouchableWithoutFeedback
                        onPress={() => {
                          onChange(patientData.stateAbbreviation);
                          setShowStatePicker(false);
                        }}
                      >
                        <View style={s.backdrop} />
                      </TouchableWithoutFeedback>
                    )}
                  >
                    <View style={s.modal}>
                      <Picker
                        itemStyle={s.pickerItem}
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
                        onPress={() => {
                          onChange(value);
                          setShowStatePicker(false);
                        }}
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
              <Feather name="user" size={g.ms(24)} color={g.neutral400} />
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
                      onChange(patientData.gender);
                      setShowGenderPicker(false);
                    }}
                    customBackdrop={(
                      <TouchableWithoutFeedback
                        onPress={() => {
                          onChange(patientData.gender);
                          setShowGenderPicker(false);
                        }}
                      >
                        <View style={s.backdrop} />
                      </TouchableWithoutFeedback>
                    )}
                  >
                    <View style={s.modal}>
                      <Picker
                        itemStyle={s.pickerItem}
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
          <Text style={s.version}>
            {`Version: ${Constants.expoConfig.version}`}
          </Text>
        </ScrollView>
        <AnimatedTouchableOpacity
          style={[
            s.saveButton,
            !isDirty && s.saveButtonDisabled,
            isPending && s.saveButtonLoading,
            animatedStyles,
          ]}
          onPress={handleSubmit((data: any) => {
            Keyboard.dismiss();
            onUpdatePatient(data);
            reset(data);
          })}
          disabled={!isDirty || isPending}
        >
          {isPending
            ? <ActivityIndicator color={g.white} size="large" />
            : (
              <>
                <Text style={s.saveButtonLabel}>
                  Save
                </Text>
              </>
            )
          }
        </AnimatedTouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
