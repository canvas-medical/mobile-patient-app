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
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { FieldError, UseFormClearErrors } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Overlay } from '@rneui/themed';
import { formatPhoneNumber } from '@utils';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    gap: g.size(4),
  },
  containerFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorMessage: {
    ...g.bodySmall,
    color: g.red,
    opacity: 0.8,
    position: 'absolute',
    top: '100%',
    right: g.size(12),
    alignSelf: 'flex-end',
  },
  input: {
    ...g.bodyLarge,
    color: g.black,
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    flex: 1,
  },
  inputContainer: {
    backgroundColor: g.neutral50,
    borderRadius: g.size(50),
    overflow: 'hidden',
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
    color: g.neutral300,
  },
  passwordRevealButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: g.size(12),
  },
  pickerOverlay: {
    width: '85%',
    borderRadius: g.size(16),
    backgroundColor: g.white,
    paddingVertical: 0
  },
  selectorButton: {
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
    backgroundColor: g.neutral50,
    borderRadius: g.size(50),
  },
  selectorButtonLabel: {
    ...g.bodyLarge,
    color: g.black,
  },
  selectorButtonPlaceholder: {
    color: g.neutral200
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
}

interface DateInputProps extends InputProps {
  type: 'date-picker',
  minimumDate: Date | null,
  maximumDate: Date | null,
}

interface SelectorInputProps extends InputProps {
  type: 'selector',
  options: string[] | { value: string, label: string }[],
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
  } = props;
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  return (
    <View style={[s.inputContainer, error && s.inputContainerError]}>
      <TextInput
        style={[s.input, error && s.inputError]}
        placeholder={placeholder}
        placeholderTextColor={error ? g.neutral500 : g.neutral200}
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
      />
      {name.toLowerCase().includes('password') && (
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={s.passwordRevealButton}
        >
          <Octicons
            name={hidePassword ? 'eye' : 'eye-closed'}
            size={g.size(24)}
            color={error ? g.neutral500 : g.neutral300}
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
  } = props;

  const dateLabel = new Date(new Date(value).getTime() + (new Date(value).getTimezoneOffset() * 60000));

  return (
    <DateTimePicker
      mode="date"
      value={dateLabel}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      onChange={(e: any) => {
        if (e.type === 'set') {
          onChange(new Date(e.nativeEvent.timestamp).toISOString().slice(0, 10));
        }
      }}
    />
  );
}

function SelectorComponent(props) {
  const {
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
        <Overlay
          isVisible={show}
          onBackdropPress={() => setShow(false)}
          overlayStyle={s.pickerOverlay}
        >
          <Picker
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
        </Overlay>
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
