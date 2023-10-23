import { useState, useRef } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Button, Screen, Input } from '@components';
import { g } from '@styles';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: g.white,
    borderTopLeftRadius: g.size(36),
    borderTopRightRadius: g.size(36),
    padding: g.size(36),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: g.red,
    borderStyle: 'solid',
    gap: g.size(48),
  },
  footer: {
    ...g.labelSmall,
    color: g.neutral500,
    textAlign: 'center',
  },
  footerLink: {
    color: g.primaryBlue,
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
  subGreeting: {
    ...g.bodyLarge,
    color: g.neutral300,
    marginTop: g.size(2),
  },
  title: {
    ...g.titleLarge,
    marginTop: g.size(16),
  },
});

export default function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const passwordRef = useRef<TextInput>();
  const emailRef = useRef<TextInput>();
  const passwordConfirmationRef = useRef<TextInput>();

  const error = false;
  // const error = true;

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={g.size(-160)}
    >
      <Screen>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                Sign Up
              </Text>
            </View>
            <View style={s.contentContainer}>
              <View>
                <Text style={s.greeting}>
                  Welcome
                </Text>
                <Text style={s.subGreeting}>
                  Hello there, sign up to continue!
                </Text>
              </View>
              <View style={s.formContainer}>
                <View style={s.formInputs}>
                  <Input
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    onChange={setName}
                    value={name}
                    onSubmitEditing={() => emailRef.current?.focus()}
                    autoCapitalize="words"
                    keyboardType="default"
                    textContentType="name"
                    returnKeyType="next"
                    error={error}
                  />
                  <Input
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    onChange={setEmail}
                    value={email}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    forwardedRef={emailRef}
                    error={error}
                  />
                  <Input
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    onChange={setPassword}
                    value={password}
                    onSubmitEditing={() => () => passwordConfirmationRef.current?.focus()}
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="password"
                    returnKeyType="next"
                    forwardedRef={passwordRef}
                    error={error}
                  />
                  <Input
                    name="password-confirmation"
                    label="Password Confirmation"
                    placeholder="Enter your password again"
                    onChange={setPasswordConfirmation}
                    value={passwordConfirmation}
                    onSubmitEditing={() => null} // TODO: handle submit
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="password"
                    returnKeyType="go"
                    forwardedRef={passwordConfirmationRef}
                    error={error}
                  />
                </View>
                <Button
                  onPress={() => router.push('/records')}
                  label="Sign Up"
                  theme="primary"
                />
              </View>
              <Text style={s.footer}>
                Already have an account?
                &nbsp;
                <Link
                  href="/sign-in"
                  style={s.footerLink}
                >
                  Sign in
                </Link>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Screen>
    </KeyboardAvoidingView>
  );
}
