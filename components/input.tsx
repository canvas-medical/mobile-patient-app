/* eslint-disable max-len */
import { Dispatch, SetStateAction, useState, Ref } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    gap: g.size(4),
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
});

interface Props {
  name: string,
  label: string,
  placeholder: string,
  onChange: Dispatch<SetStateAction<string>>,
  value: string,
  onSubmitEditing: () => void,
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
  keyboardType: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad',
  textContentType: 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState' | 'countryName' | 'creditCardNumber' | 'emailAddress' | 'familyName' | 'fullStreetAddress' | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'name' | 'namePrefix' | 'nameSuffix' | 'nickname' | 'organizationName' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2' | 'sublocality' | 'telephoneNumber' | 'username' | 'password',
  returnKeyType: 'default' | 'go' | 'next' | 'search' | 'send' | 'done',
  forwardedRef?: Ref<TextInput>,
  error: boolean;
}

export function Input(props: Props) {
  const {
    name,
    label,
    placeholder,
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
    <View style={s.container}>
      <Text style={s.label}>
        {label}
      </Text>
      <View style={[s.inputContainer, error && s.inputContainerError]}>
        <TextInput
          style={[s.input, error && s.inputError]}
          placeholder={placeholder}
          placeholderTextColor={error ? g.neutral500 : g.neutral200}
          secureTextEntry={name === 'password' && hidePassword}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => onChange(e.nativeEvent.text)}
          value={value}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
          ref={forwardedRef}
        />
        {name.includes('password') && (
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
    </View>
  );
}
