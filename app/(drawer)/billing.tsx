import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView, Text
} from 'react-native';
import { Button, Input, Screen, Header } from '@components';
import { g } from '@styles';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { initPaymentSheet, presentPaymentSheet, StripeProvider } from '@stripe/stripe-react-native';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: g.size(36),
    alignSelf: 'center',
    width: g.width * 0.8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: g.size(16),
    padding: g.size(16),
  },
  dollarSign: {
    position: 'absolute',
    top: g.size(26),
    left: g.size(12),
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    width: g.width * 0.85,
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    marginTop: g.size(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(20),
    paddingLeft: g.size(20)
  },
});

export default function Billing() {
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = async () => {
    const cents = Number(amount) * 100;
    const response = await fetch(`${process.env.EXPO_PUBLIC_STRIPE_API_URL}/payment_intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.EXPO_PUBLIC_STRIPE_API_KEY,
      },
      body: JSON.stringify({ amount: cents })
    });
    const paymentIntent = await response.json();
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Brewer Digital',
      paymentIntentClientSecret: paymentIntent.clientSecret,
      allowsDelayedPaymentMethods: false,
    });
    console.log('init error', error);
    const { error: paymentError } = await presentPaymentSheet();
    console.log('present error', paymentError);
  };

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}
    >
      <Screen>
        <KeyboardAvoidingView style={{ height: g.height }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={s.container}>
                <Header />
                <View style={s.titleContainer}>
                  <Feather name="credit-card" size={g.size(36)} color={g.white} />
                  <Text style={s.title}>
                    Bill Pay
                  </Text>
                </View>
                <View style={s.inputContainer}>
                  <Feather style={s.dollarSign} name="dollar-sign" size={g.size(20)} color={g.neutral200} />
                  <Input
                    onChange={setAmount}
                    value={amount}
                    placeholder="Enter dollar amount to pay"
                    keyboardType="numeric"
                    error={null}
                    label=""
                    name="amount"
                    onFocus={() => {}}
                    type="text"
                    onSubmitEditing={() => {}}
                    autoCapitalize="none"
                    textContentType="none"
                    returnKeyType="default"
                    style={{ paddingLeft: g.size(36), color: g.white }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={s.buttonContainer}>
          <Button label="Submit Payment" theme="secondary" onPress={handleSubmit} />
        </View>
      </Screen>
    </StripeProvider>
  );
}
