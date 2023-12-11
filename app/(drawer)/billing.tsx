import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView, Text, Alert, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { Button, Input, Screen, Header } from '@components';
import { g } from '@styles';
import { Feather } from '@expo/vector-icons';
import { initPaymentSheet, presentPaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
import { getPaymentIntent, usePaymentIntentCapture, usePaymentNotices, usePaymentNoticeSubmit } from '@services';

const s = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    right: g.size(0),
    top: g.size(18),
    height: g.size(36),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: g.size(16),
    padding: g.size(32),
  },
  disabled: {
    opacity: 0.7,
  },
  dollarSign: {
    position: 'absolute',
    top: g.size(26),
    left: g.size(12),
  },
  error: {
    ...g.bodySmall,
    color: g.white,
    opacity: 0.8,
    marginLeft: g.size(32),
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    width: g.width * 0.85,
  },
  label: {
    ...g.labelMedium,
    color: g.white,
  },
  payButton: {
    ...g.bodyLarge,
    color: g.primaryBlue,
    overflow: 'hidden',
    backgroundColor: g.white,
    borderRadius: g.size(18),
    paddingVertical: g.size(8),
    paddingHorizontal: g.size(16),
  },
  title: {
    ...g.titleLarge,
  },
  titleContainer: {
    marginTop: g.size(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: g.size(20),
    paddingLeft: g.size(4)
  }
});

export default function Billing() {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const { mutate: onPaymentIntentCapture, isSuccess: paymentIntentSuccess, isPending: paymentIntentPending } = usePaymentIntentCapture();
  const { mutate: onPaymentNoticeSubmit, isSuccess: paymentNoticeSuccess, isPending: paymentNoticePending } = usePaymentNoticeSubmit();
  const { data: paymentNotices, isLoading, refetch } = usePaymentNotices();
  const disabled = Number(amount) < 1 || paymentNoticePending || paymentIntentPending;

  const handleSubmit = async () => {
    const cents = Number(amount) * 100;
    if (Number.isNaN(cents)) { setError('Please enter a valid dollar amount'); return; }
    if (error) setError('');
    const paymentIntent = await getPaymentIntent(cents);
    if (!paymentIntent.paymentIntentId) {
      setError('Something went wrong. Please try again.');
      return;
    }
    setPaymentIntentId(paymentIntent.paymentIntentId);
    const { error: initPaymentError } = await initPaymentSheet({
      merchantDisplayName: 'Brewer Digital',
      paymentIntentClientSecret: paymentIntent.clientSecret,
      allowsDelayedPaymentMethods: false,
    });
    const { error: presentPaymentError } = await presentPaymentSheet();
    console.log('after payment sheet things');
    if (initPaymentError || presentPaymentError) {
      setError('Something went wrong. Please try again.');
      return;
    }
    onPaymentNoticeSubmit(amount);
  };

  useEffect(() => {
    const capturePayment = async () => {
      if (!paymentNoticeSuccess || !paymentIntentId) return;
      onPaymentIntentCapture(paymentIntentId);
      setPaymentIntentId('');
    };
    capturePayment();
  }, [paymentNoticeSuccess]);

  useEffect(() => {
    const clearForm = async () => {
      if (paymentIntentSuccess) {
        setAmount('');
        refetch();
      }
    };
    clearForm();
  }, [paymentIntentSuccess]);

  const formattedDate = (date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'utc' });
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY}
    >
      <Screen>
        <Header />
        <KeyboardAvoidingView style={{ height: g.height }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={s.container}>
                <View style={s.titleContainer}>
                  <Feather name="credit-card" size={g.size(36)} color={g.white} />
                  <Text style={s.title}>
                    Billing
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
                    selectionColor={g.white}
                  />
                  <View style={s.buttonContainer}>
                    <TouchableOpacity onPress={handleSubmit} disabled={disabled}>
                      {paymentNoticePending || paymentIntentPending
                        ? <ActivityIndicator size="small" style={s.payButton} color={g.primaryBlue} />
                        : <Text style={[s.payButton, disabled && s.disabled]}>Pay</Text>
                      }
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={s.error}>{error}</Text>
                {(paymentNotices.length || isLoading) && <Text style={s.label}>Payment History</Text>}
                {isLoading
                  ? <ActivityIndicator size="large" color={g.white} />
                  : paymentNotices?.map((notice) => (
                    <View key={notice.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: g.white }}>
                        $
                        {notice.resource.amount.value.toFixed(2)}
                      </Text>
                      <Text style={{ color: g.white }}>{formattedDate(notice.resource.created)}</Text>
                    </View>
                  ))}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </StripeProvider>
  );
}
