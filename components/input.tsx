/* eslint-disable react/jsx-props-no-spreading */
import { useState, Ref, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  TextInputSubmitEditingEventData,
  Platform, TouchableWithoutFeedback,
} from 'react-native';
import { FieldError, UseFormClearErrors } from 'react-hook-form';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Octicons } from '@expo/vector-icons';
import { Button } from '@components/button';
import { formatDate, formatPhoneNumber, timeZoneOffset } from '@utils';
import { g } from '@styles';

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: g.black,
    opacity: 0.5,
  },
  container: {
    gap: g.hs(4),
  },
  containerFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorMessage: {
    ...g.bodySmall,
    color: g.severityRed,
    opacity: 0.8,
    position: 'absolute',
    top: '100%',
    right: g.ws(12),
    alignSelf: 'flex-end',
  },
  input: {
    ...g.bodyLarge,
    color: g.neutral900,
    paddingVertical: g.hs(8),
    paddingHorizontal: g.ms(16),
    flex: 1,
  },
  inputContainer: {
    backgroundColor: g.neutral150,
    borderRadius: g.ms(50),
    flexDirection: 'row',
  },
  inputContainerError: {
    backgroundColor: g.error,
  },
  inputError: {
    color: g.neutral500,
  },
  label: {
    ...g.labelMedium,
    color: g.neutral500,
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
  passwordRevealButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: g.ms(12),
  },
  pickerItem: {
    ...g.bodyLarge,
    color: g.neutral900,
  },
  selectorButton: {
    paddingVertical: g.hs(8),
    paddingHorizontal: g.ms(16),
    backgroundColor: g.neutral150,
    borderRadius: g.ms(50),
  },
  selectorButtonLabel: {
    ...g.bodyLarge,
    color: g.neutral900,
  },
  selectorButtonPlaceholder: {
    color: g.neutral400
  },
  selectorButtonPlaceholderError: {
    color: g.neutral500
  }
});

interface InputProps {
  name: string,
  label: string,
  placeholder: string,
  value: string,
  onFocus: UseFormClearErrors<{ [key: string]: string }>,
  onChange: (...event: any[]) => void,
  forwardedRef?: Ref<TextInput>,
  error: FieldError | undefined;
}

interface TextInputProps extends InputProps {
  type: 'text',
  onSubmitEditing: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void,
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
  keyboardType: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad',
  textContentType: 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState'
  | 'countryName' | 'creditCardNumber' | 'emailAddress' | 'familyName' | 'fullStreetAddress'
  | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'name' | 'namePrefix' | 'nameSuffix'
  | 'nickname' | 'organizationName' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2'
  | 'sublocality' | 'telephoneNumber' | 'username' | 'password',
  returnKeyType: 'default' | 'go' | 'next' | 'search' | 'send' | 'done',
  selectionColor?: string,
  style?: object,
}

interface DateInputProps extends InputProps {
  type: 'date-picker',
  minimumDate: Date | null,
  maximumDate: Date | null,
  iosSpinner?: boolean
}

interface SelectorInputProps extends InputProps {
  type: 'selector',
  options: string[] | { value: string, label: string }[],
  buttonText?: string,
}

function TextComponent(props) {
  const {
    name,
    placeholder,
    onFocus,
    onChange,
    value,
    onSubmitEditing,
    autoCapitalize,
    keyboardType,
    textContentType,
    returnKeyType,
    forwardedRef,
    error,
    selectionColor,
    style
  } = props;
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  return (
    <View style={[s.inputContainer, error && s.inputContainerError]}>
      <TextInput
        style={[s.input, error && s.inputError, style]}
        placeholder={placeholder}
        placeholderTextColor={error ? g.neutral500 : g.neutral400}
        secureTextEntry={name.toLowerCase().includes('password') && hidePassword}
        onFocus={() => onFocus()}
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          if (name === 'phone') {
            onChange(formatPhoneNumber(e.nativeEvent.text));
          } else onChange(e.nativeEvent.text);
        }}
        value={value}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        ref={forwardedRef}
        selectionColor={selectionColor}
      />
      {name.toLowerCase().includes('password') && (
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={s.passwordRevealButton}
        >
          <Octicons
            name={hidePassword ? 'eye' : 'eye-closed'}
            size={g.ms(24)}
            color={error ? g.neutral500 : g.neutral400}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

function DatePickerComponent(props) {
  const {
    value,
    minimumDate,
    maximumDate,
    onChange,
    error,
    iosSpinner,
  } = props;
  const [showDatePicker, setShowDatePicker] = useState<boolean>(Platform.OS === 'ios' && !iosSpinner);
  return (
    <>
      {showDatePicker && !iosSpinner && (
        <DateTimePicker
          mode="date"
          value={timeZoneOffset(value)}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={(e: any) => {
            if (e.type === 'set') {
              onChange(new Date(e.nativeEvent.timestamp).toISOString().slice(0, 10));
              if (Platform.OS === 'android') setShowDatePicker(false);
            }
          }}
        />
      )}

      {iosSpinner && (
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
              display="spinner"
              themeVariant="light"
              value={new Date(value)}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              onChange={(e: any) => {
                if (e.type === 'set') {
                  onChange(new Date(e.nativeEvent.timestamp).toISOString().slice(0, 10));
                  if (Platform.OS === 'android') setShowDatePicker(false);
                }
              }}
            />
            <Button label="Select" theme="primary" onPress={() => setShowDatePicker(false)} />
          </View>
        </Modal>
      )}

      {(Platform.OS === 'android' || iosSpinner) && (
        <TouchableOpacity
          style={[s.selectorButton, !!error && s.inputContainerError]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text
            style={[
              s.selectorButtonLabel,
              !value && !error && s.selectorButtonPlaceholder,
              !value && !!error && s.selectorButtonPlaceholderError,
            ]}
          >
            {!value ? 'Select a date' : formatDate(value)}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

function SelectorComponent(props) {
  const {
    buttonText,
    placeholder,
    value,
    onChange,
    onFocus,
    options,
    error,
  } = props;
  const [show, setShow] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  useEffect(() => {
    if (!value && show) {
      const isString = typeof options[0] === 'string';
      onChange(isString ? options[0] : options[0].value);
      setSelectedLabel(isString ? options[0] : options[0].label);
    }
  }, [show]);

  return (
    <>
      <TouchableOpacity
        style={[s.selectorButton, error && s.inputContainerError]}
        onPress={() => {
          onFocus();
          setShow(true);
        }}
      >
        <Text
          style={[
            s.selectorButtonLabel,
            (!value && !error) && s.selectorButtonPlaceholder,
            (!value && error) && s.selectorButtonPlaceholderError,
          ]}
        >
          {selectedLabel || value || placeholder}
        </Text>
      </TouchableOpacity>
      {show && (
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={show}
          swipeDirection="right"
          onSwipeComplete={() => setShow(false)}
          customBackdrop={(
            <TouchableWithoutFeedback onPress={() => setShow(false)}>
              <View style={s.backdrop} />
            </TouchableWithoutFeedback>
          )}
        >
          <View style={s.modal}>
            <Picker
              itemStyle={s.pickerItem}
              selectedValue={value}
              onValueChange={(itemValue, index) => { onChange(itemValue); setSelectedLabel(options[index].label); }}
            >
              {options.map((option) => {
                const isString = typeof option === 'string';
                return (
                  <Picker.Item
                    key={isString ? option : option.value}
                    label={isString ? option : option.label}
                    value={isString ? option : option.value}
                  />
                );
              })}
            </Picker>
            {buttonText && (
              <Button
                label={buttonText}
                disabled={!value}
                theme="primary"
                onPress={() => setShow(false)}
              />
            )}
          </View>
        </Modal>
      )}
    </>
  );
}

export function Input(props: TextInputProps | DateInputProps | SelectorInputProps) {
  const {
    type,
    label,
    error,
  } = props;

  const inputSwitch = () => {
    switch (type) {
      case 'text': return <TextComponent {...props} />;
      case 'date-picker': return <DatePickerComponent {...props} />;
      case 'selector': return <SelectorComponent {...props} />;
      default: return null;
    }
  };

  return (
    <View style={[s.container, type === 'date-picker' && s.containerFlexRow]}>
      {!!error && <Text style={s.errorMessage}>{error.message}</Text>}
      <Text style={s.label}>
        {label}
      </Text>
      {inputSwitch()}
    </View>
  );
}
