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
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Button, Screen, Input } from '@components';
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
    gap: g.size(48),
  },
  formContainer: {
    gap: g.size(36),
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
    marginTop: g.size(8),
  },
  title: {
    ...g.titleLarge,
    marginTop: g.size(16),
  },
});

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
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
              Forgot Password?
            </Text>
          </View>
          <View style={s.contentContainer}>
            <View>
              <Text style={s.greeting}>
                It happens to all of us
              </Text>
              <Text style={s.subGreeting}>
                Enter your email below and we&apos;ll send you a link to reset your password.
              </Text>
            </View>
            <View style={s.formContainer}>
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
                returnKeyType="send"
                error={error}
              />
              <Button
                onPress={() => null} // TODO: Handle submit
                label="Submit"
                theme="primary"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
}
