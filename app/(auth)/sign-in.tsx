import { useState, useRef } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Button, Screen, Input } from '@components';
import apple from '@assets/icons/apple-logo.png';
import google from '@assets/icons/google-logo.png';
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
  },
  divider: {
    height: g.size(2),
    borderRadius: g.size(2),
    backgroundColor: g.neutral100,
    flex: 1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    ...g.labelSmall,
    color: g.neutral500,
    textAlign: 'center',
  },
  footerLink: {
    color: g.primaryBlue,
  },
  forgotPassword: {
    ...g.bodyMedium,
    color: g.primaryBlue,
  },
  formContainer: {
    gap: g.size(36),
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
  oauthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  oauthIcon: {
    width: g.size(48),
  },
  or: {
    ...g.labelMedium,
    color: g.neutral300,
    lineHeight: g.size(16),
    marginHorizontal: g.size(8),
  },
  passwordInputContainer: {
    gap: g.size(16),
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

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<TextInput>();

  const error = false;
  // const error = true;

  return (
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
              Sign In
            </Text>
          </View>
          <View style={s.contentContainer}>
            <View>
              <Text style={s.greeting}>
                Welcome Back
              </Text>
              <Text style={s.subGreeting}>
                Hello there, sign in to continue!
              </Text>
            </View>
            <View style={s.formContainer}>
              <View style={s.formInputs}>
                <Input
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  onChange={setEmail}
                  value={email}
                  onSubmitEditing={() => {
                    passwordRef.current?.focus();
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  error={error}
                />
                <View style={s.passwordInputContainer}>
                  <Input
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    onChange={setPassword}
                    value={password}
                    onSubmitEditing={() => null} // TODO: handle submit
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="password"
                    returnKeyType="go"
                    forwardedRef={passwordRef}
                    error={error}
                  />
                  <Link
                    href="/forgot-password"
                    style={s.forgotPassword}
                  >
                    <Text>Forgot Password?</Text>
                  </Link>
                </View>
              </View>
              <Button
                onPress={() => router.push('records')} // TODO: handle submit
                label="Sign In"
                theme="primary"
              />
              <View style={s.dividerContainer}>
                <View style={s.divider} />
                <Text style={s.or}>or</Text>
                <View style={s.divider} />
              </View>
              <View style={s.oauthContainer}>
                <TouchableOpacity
                  onPress={() => null}
                >
                  <Image
                    style={{
                      ...s.oauthIcon,
                      height: g.size(49.12),
                    }}
                    source={google}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => null}
                >
                  <Image
                    style={{
                      ...s.oauthIcon,
                      height: g.size(55.92),
                    }}
                    source={apple}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={s.footer}>
              Don&apos;t have an account?
              &nbsp;
              <Link
                href="/sign-up"
                style={s.footerLink}
              >
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
}
